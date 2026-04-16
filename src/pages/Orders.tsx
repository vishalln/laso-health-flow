import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockOrder } from '@/data/mockOrders';
import { orderHistory, refillStatus, OrderRecord } from '@/data/clinicalArtifacts';
import { Package, MapPin, Truck, CheckCircle2, Circle, Search, Filter, ArrowUpDown, AlertTriangle, Thermometer, ChevronRight } from 'lucide-react';

type SortKey = 'date' | 'amount';
type StatusFilter = 'all' | 'delivered' | 'in-transit' | 'processing' | 'cancelled';

const statusBadge: Record<string, { className: string; label: string }> = {
  delivered: { className: 'bg-success/10 text-success', label: 'Delivered' },
  'in-transit': { className: 'bg-primary/10 text-primary', label: 'In Transit' },
  processing: { className: 'bg-accent/10 text-accent', label: 'Processing' },
  cancelled: { className: 'bg-destructive/10 text-destructive', label: 'Cancelled' },
};

export default function Orders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortKey>('date');
  const [sortDesc, setSortDesc] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);

  const filteredOrders = useMemo(() => {
    let orders = [...orderHistory];
    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter(o => o.id.toLowerCase().includes(q) || o.items.some(it => it.name.toLowerCase().includes(q)));
    }
    if (statusFilter !== 'all') {
      orders = orders.filter(o => o.status === statusFilter);
    }
    orders.sort((a, b) => {
      if (sortBy === 'amount') return sortDesc ? b.total - a.total : a.total - b.total;
      return sortDesc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });
    return orders;
  }, [search, statusFilter, sortBy, sortDesc]);

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) setSortDesc(!sortDesc);
    else { setSortBy(key); setSortDesc(true); }
  };

  const selectedOrderData = orderHistory.find(o => o.id === selectedOrder);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-foreground">Orders & Delivery</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track shipments, view history, and manage refills</p>

          {/* Refill Alert */}
          {(refillStatus.status === 'low' || refillStatus.status === 'critical') && (
            <Card className={`mt-4 ${refillStatus.status === 'critical' ? 'border-destructive/30' : 'border-accent/30'}`}>
              <CardContent className="flex items-center gap-4 py-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${refillStatus.status === 'critical' ? 'bg-destructive/10' : 'bg-accent/10'}`}>
                  <Package className={`h-5 w-5 ${refillStatus.status === 'critical' ? 'text-destructive' : 'text-accent'}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {refillStatus.status === 'critical' ? 'Medication supply critical' : 'Medication running low'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {refillStatus.currentSupply} days of {refillStatus.medicationName} remaining · Estimated run out: {refillStatus.estimatedRunOut}
                  </p>
                </div>
                <Button size="sm" variant={refillStatus.status === 'critical' ? 'destructive' : 'default'}>
                  Reorder Now
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Current Order Tracker */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Truck className="h-4 w-4 text-primary" /> Active Shipment
                </CardTitle>
                <Badge variant="secondary">#{mockOrder.id}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Delivery Intelligence */}
              <div className="mb-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span className="text-muted-foreground">ETA: {mockOrder.delivery.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-xs">
                  <Thermometer className="h-3 w-3 text-success" />
                  <span className="text-muted-foreground">Cold chain: intact</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-success/10 px-2.5 py-1 text-xs">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  <span className="text-success">On schedule</span>
                </div>
              </div>

              {/* Stepper */}
              <div className="space-y-0">
                {mockOrder.steps.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {s.completed ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                      ) : s.active ? (
                        <div className="h-5 w-5 shrink-0 rounded-full border-2 border-primary bg-primary/20" />
                      ) : (
                        <Circle className="h-5 w-5 shrink-0 text-muted-foreground/30" />
                      )}
                      {i < mockOrder.steps.length - 1 && <div className={`my-1 h-8 w-px ${s.completed ? 'bg-success' : 'bg-border'}`} />}
                    </div>
                    <div className="pb-4">
                      <p className={`text-sm ${s.completed || s.active ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                      {s.timestamp && <p className="text-xs text-muted-foreground">{s.timestamp}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Post-delivery confirmation */}
              {!deliveryConfirmed && (
                <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-sm font-medium text-foreground">Delivery confirmation</p>
                  <p className="mt-1 text-xs text-muted-foreground">Once delivered, please confirm receipt and package condition.</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={() => setDeliveryConfirmed(true)}>Confirm Receipt</Button>
                    <Button size="sm" variant="outline" className="text-destructive">Report Issue</Button>
                  </div>
                </div>
              )}
              {deliveryConfirmed && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 p-3">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <p className="text-sm text-success">Delivery confirmed. Thank you!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="mt-4">
            <CardContent className="flex items-start gap-3 pt-5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Delivery Address</p>
                <p className="text-sm text-muted-foreground">{mockOrder.delivery.address}</p>
                <p className="mt-1 text-xs text-muted-foreground">Carrier: {mockOrder.delivery.carrier} · Tracking: {mockOrder.delivery.trackingId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Pharmacy */}
          <Card className="mt-4">
            <CardContent className="pt-5">
              <h3 className="text-sm font-semibold text-foreground">Pharmacy Details</h3>
              <p className="mt-1 text-sm text-muted-foreground">Dispensed by: {mockOrder.pharmacy.name}</p>
              <p className="text-xs text-muted-foreground">Drug License No: {mockOrder.pharmacy.license}</p>
              <p className="mt-2 text-xs text-muted-foreground">{mockOrder.pharmacy.note}</p>
            </CardContent>
          </Card>

          {/* Order History */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-foreground">Order History</h2>

            {/* Search + Filter */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by order ID or medication..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
              </div>
              <div className="flex gap-2">
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as StatusFilter)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="in-transit">In Transit</option>
                  <option value="processing">Processing</option>
                </select>
                <Button variant="outline" size="sm" onClick={() => toggleSort('date')} className="gap-1">
                  <ArrowUpDown className="h-3 w-3" /> Date
                </Button>
                <Button variant="outline" size="sm" onClick={() => toggleSort('amount')} className="gap-1">
                  <ArrowUpDown className="h-3 w-3" /> Amount
                </Button>
              </div>
            </div>

            {/* Orders list */}
            <div className="mt-4 space-y-3">
              {filteredOrders.map(order => {
                const badge = statusBadge[order.status];
                return (
                  <Card key={order.id} className="cursor-pointer transition-all hover:shadow-md" onClick={() => setSelectedOrder(order.id)}>
                    <CardContent className="flex items-center gap-4 py-4">
                      <Package className="h-5 w-5 shrink-0 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">#{order.id}</p>
                          <Badge variant="outline" className={`text-[10px] ${badge.className}`}>{badge.label}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{order.date} · {order.items.length} item(s)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">₹{order.total.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{order.status === 'delivered' ? `Delivered ${order.deliveryDate}` : order.deliveryDate}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                );
              })}
              {filteredOrders.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">No orders found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Order #{selectedOrderData?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrderData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Placed {selectedOrderData.date}</span>
                <Badge variant="outline" className={`text-[10px] ${statusBadge[selectedOrderData.status].className}`}>
                  {statusBadge[selectedOrderData.status].label}
                </Badge>
              </div>
              <div className="space-y-2">
                {selectedOrderData.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.name}</span>
                    <span className="font-medium">{item.price === 0 ? 'Free' : `₹${item.price.toLocaleString()}`}</span>
                  </div>
                ))}
              </div>
              <hr className="border-border" />
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Total</span>
                <span>₹{selectedOrderData.total.toLocaleString()}</span>
              </div>
              <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                <p>Prescribed by Dr. Rahul Sharma</p>
                <p>Tracking: {selectedOrderData.trackingId}</p>
                {selectedOrderData.status === 'delivered' && <p>Delivered: {selectedOrderData.deliveryDate}</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
