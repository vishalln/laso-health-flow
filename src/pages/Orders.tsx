import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockOrder } from '@/data/mockOrders';
import { Package, MapPin, Truck, CheckCircle2, Circle } from 'lucide-react';

export default function Orders() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-foreground">Order & Delivery</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your medication shipment</p>

          {/* Order summary */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base"><Package className="h-4 w-4 text-primary" /> Order #{mockOrder.id}</CardTitle>
                <Badge variant="secondary">Placed {mockOrder.placedDate}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{item.name}</span>
                    <span className="font-medium text-foreground">{item.price === 0 ? 'Free' : `₹${item.price.toLocaleString()}`}</span>
                  </div>
                ))}
              </div>
              <hr className="my-3 border-border" />
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Total</span>
                <span>₹{mockOrder.total.toLocaleString()}</span>
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

          {/* Delivery tracker */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Truck className="h-4 w-4 text-primary" /> Delivery Status</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Delivery address */}
          <Card className="mt-4">
            <CardContent className="flex items-start gap-3 pt-5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Delivery Address</p>
                <p className="text-sm text-muted-foreground">{mockOrder.delivery.address}</p>
                <p className="mt-1 text-xs text-muted-foreground">Estimated delivery: {mockOrder.delivery.estimatedTime}</p>
                <p className="text-xs text-muted-foreground">Carrier: {mockOrder.delivery.carrier} · Tracking: {mockOrder.delivery.trackingId}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
