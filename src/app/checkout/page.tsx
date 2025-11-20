"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/cart-context";
import {
  CreditCard,
  Truck,
  MapPin,
  CheckCircle,
  Lock,
  ArrowLeft,
  ArrowRight,
  Building,
  FileText,
  Loader2,
  Package,
  Smartphone
} from "lucide-react";

const steps = [
  { id: 1, name: "Shipping", icon: Truck },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Review", icon: FileText },
  { id: 4, name: "Confirmation", icon: CheckCircle }
];

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, clearCart, isLoading: cartLoading } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: session?.user?.email || "",
    phone: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    province: "Gauteng",
    postalCode: "",
    deliveryNotes: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 250;
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + shipping + tax;

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && cartItems.length === 0 && !orderPlaced) {
      router.push("/cart");
    }
  }, [cartLoading, orderPlaced, router, cartItems.length]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingInfo,
          paymentMethod,
          items: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
          subtotal,
          shipping,
          tax,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();
      setOrderNumber(order.orderNumber);
      setOrderPlaced(true);
      setCurrentStep(4);
      await clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-sky-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600">Complete your order securely</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? "bg-green-600 border-green-600 text-white"
                          : isActive
                          ? "bg-sky-600 border-sky-600 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <StepIcon className="h-6 w-6" />
                      )}
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        isActive || isCompleted ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${
                        isCompleted ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-6 w-6 text-sky-600" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        placeholder="+27 12 345 6789"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={shippingInfo.company}
                        onChange={(e) => setShippingInfo({...shippingInfo, company: e.target.value})}
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <Label htmlFor="apartment">Apartment, Suite, etc. (Optional)</Label>
                    <Input
                      id="apartment"
                      value={shippingInfo.apartment}
                      onChange={(e) => setShippingInfo({...shippingInfo, apartment: e.target.value})}
                      placeholder="Apt 4B"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        placeholder="Johannesburg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="province">Province *</Label>
                      <select
                        id="province"
                        value={shippingInfo.province}
                        onChange={(e) => setShippingInfo({...shippingInfo, province: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-input bg-white text-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option>Gauteng</option>
                        <option>Western Cape</option>
                        <option>KwaZulu-Natal</option>
                        <option>Eastern Cape</option>
                        <option>Free State</option>
                        <option>Limpopo</option>
                        <option>Mpumalanga</option>
                        <option>Northern Cape</option>
                        <option>North West</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                        placeholder="2000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deliveryNotes">Delivery Notes (Optional)</Label>
                    <Textarea
                      id="deliveryNotes"
                      value={shippingInfo.deliveryNotes}
                      onChange={(e) => setShippingInfo({...shippingInfo, deliveryNotes: e.target.value})}
                      placeholder="Special delivery instructions..."
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Link href="/cart">
                      <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Cart
                      </Button>
                    </Link>
                    <Button onClick={handleNext} className="bg-sky-600 hover:bg-sky-700">
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-sky-600" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {/* Credit & Debit Card */}
                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "card" ? "border-sky-600 bg-sky-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "card" ? "border-sky-600 bg-sky-600" : "border-gray-300"}`}>
                            {paymentMethod === "card" && <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>}
                          </div>
                          <CreditCard className="h-5 w-5 text-gray-700" />
                          <span className="font-medium">Credit & Debit Card</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded">VISA</span>
                          <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded">MasterCard</span>
                          <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-1 rounded">Amex</span>
                          <span className="text-xs font-semibold text-gray-700 bg-gray-200 px-2 py-1 rounded">Diners</span>
                        </div>
                      </div>
                    </div>

                    {/* EFT & 1Voucher with Ozow */}
                    <div
                      onClick={() => setPaymentMethod("ozow")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "ozow" ? "border-sky-600 bg-sky-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "ozow" ? "border-sky-600 bg-sky-600" : "border-gray-300"}`}>
                            {paymentMethod === "ozow" && <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>}
                          </div>
                          <Building className="h-5 w-5 text-gray-700" />
                          <span className="font-medium">EFT & 1Voucher with Ozow</span>
                        </div>
                        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded">OZOW</span>
                      </div>
                    </div>

                    {/* EFT with PayFast */}
                    <div
                      onClick={() => setPaymentMethod("payfast")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "payfast" ? "border-sky-600 bg-sky-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "payfast" ? "border-sky-600 bg-sky-600" : "border-gray-300"}`}>
                            {paymentMethod === "payfast" && <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>}
                          </div>
                          <Building className="h-5 w-5 text-gray-700" />
                          <span className="font-medium">EFT with PayFast</span>
                        </div>
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">PAYFAST</span>
                      </div>
                    </div>

                    {/* Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "cod" ? "border-sky-600 bg-sky-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "cod" ? "border-sky-600 bg-sky-600" : "border-gray-300"}`}>
                          {paymentMethod === "cod" && <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>}
                        </div>
                        <Package className="h-5 w-5 text-gray-700" />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                    </div>

                    {/* Payflex */}
                    <div
                      onClick={() => setPaymentMethod("payflex")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "payflex" ? "border-sky-600 bg-sky-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "payflex" ? "border-sky-600 bg-sky-600" : "border-gray-300"}`}>
                            {paymentMethod === "payflex" && <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>}
                          </div>
                          <CreditCard className="h-5 w-5 text-gray-700" />
                          <div>
                            <span className="font-medium">Payflex</span>
                            <p className="text-xs text-gray-500">Pay in 4 interest-free instalments</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-pink-700 bg-pink-100 px-2 py-1 rounded">PAYFLEX</span>
                      </div>
                    </div>

                    {/* PayJustNow */}
                    <div
                      onClick={() => setPaymentMethod("payjustnow")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "payjustnow" ? "border-sky-600 bg-sky-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "payjustnow" ? "border-sky-600 bg-sky-600" : "border-gray-300"}`}>
                            {paymentMethod === "payjustnow" && <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>}
                          </div>
                          <CreditCard className="h-5 w-5 text-gray-700" />
                          <div>
                            <span className="font-medium">PayJustNow</span>
                            <p className="text-xs text-gray-500">Pay in 3 interest-free instalments</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-teal-700 bg-teal-100 px-2 py-1 rounded">PAYJUSTNOW</span>
                      </div>
                    </div>

                    {/* Scan to Pay */}
                    <div
                      onClick={() => setPaymentMethod("scantopay")}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "scantopay" ? "border-sky-600 bg-sky-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "scantopay" ? "border-sky-600 bg-sky-600" : "border-gray-300"}`}>
                            {paymentMethod === "scantopay" && <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>}
                          </div>
                          <Smartphone className="h-5 w-5 text-gray-700" />
                          <div>
                            <span className="font-medium">Scan to Pay</span>
                            <p className="text-xs text-gray-500">Use your banking app to scan QR code</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" maxLength={3} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "ozow" && (
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-gray-700">
                        You will be redirected to Ozow to complete your payment using EFT or 1Voucher.
                        Payment is instant and secure.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "payfast" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-gray-700">
                        You will be redirected to PayFast to complete your EFT payment.
                        Your order will be processed once payment is confirmed.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-gray-700 font-medium mb-2">
                        Pay with cash when your order is delivered.
                      </p>
                      <p className="text-xs text-gray-600">
                        Please have the exact amount ready. Additional delivery fee may apply.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "payflex" && (
                    <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                      <p className="text-sm text-gray-700 font-medium mb-2">
                        Split your payment into 4 interest-free instalments
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                        <li>25% due today</li>
                        <li>25% due in 2 weeks</li>
                        <li>25% due in 4 weeks</li>
                        <li>25% due in 6 weeks</li>
                      </ul>
                    </div>
                  )}

                  {paymentMethod === "payjustnow" && (
                    <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                      <p className="text-sm text-gray-700 font-medium mb-2">
                        Split your payment into 3 interest-free instalments
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                        <li>33% due today</li>
                        <li>33% due in 1 month</li>
                        <li>34% due in 2 months</li>
                      </ul>
                    </div>
                  )}

                  {paymentMethod === "scantopay" && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-gray-700 font-medium mb-2">
                        Scan the QR code with your banking app
                      </p>
                      <div className="bg-white p-4 rounded-lg flex justify-center mt-3">
                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded">
                          <p className="text-xs text-gray-500 text-center">QR Code will appear<br />after order placement</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button onClick={handleBack} variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleNext} className="bg-sky-600 hover:bg-sky-700">
                      Review Order
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-sky-600" />
                    Review Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-sky-600" />
                      Shipping Address
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-lg text-sm">
                      <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                      {shippingInfo.company && <p>{shippingInfo.company}</p>}
                      <p>{shippingInfo.address}</p>
                      {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                      <p>{shippingInfo.city}, {shippingInfo.province} {shippingInfo.postalCode}</p>
                      <p className="mt-2">{shippingInfo.email}</p>
                      <p>{shippingInfo.phone}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-sky-600" />
                      Payment Method
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm">
                        {paymentMethod === "card" && "Credit/Debit Card"}
                        {paymentMethod === "eft" && "EFT/Bank Transfer"}
                        {paymentMethod === "paypal" && "PayPal"}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="relative w-16 h-16 bg-white rounded overflow-hidden">
                            <Image
                              src={item.product.images[0] || '/images/placeholder.jpg'}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.product.name}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">R{(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button onClick={handleBack} variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handlePlaceOrder} className="bg-green-600 hover:bg-green-700">
                      <Lock className="mr-2 h-4 w-4" />
                      Place Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && orderPlaced && (
              <Card className="border-2 border-green-600">
                <CardContent className="py-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Order Confirmed!
                  </h2>
                  <p className="text-lg text-gray-600 mb-2">
                    Thank you for your order, {shippingInfo.firstName}!
                  </p>
                  <p className="text-gray-600 mb-8">
                    Order number: <strong className="text-sky-600">#WN-{orderNumber}</strong>
                  </p>
                  <div className="space-y-3 max-w-md mx-auto">
                    <p className="text-sm text-gray-600">
                      A confirmation email has been sent to <strong>{shippingInfo.email}</strong>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                      <Link href="/">
                        <Button variant="outline">
                          Continue Shopping
                        </Button>
                      </Link>
                      <Link href="/dashboard">
                        <Button className="bg-sky-600 hover:bg-sky-700">
                          View Order Status
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={item.product.images[0] || '/images/placeholder.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm">R{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">R{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">VAT (15%)</span>
                    <span className="font-medium">R{tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-sky-600">R{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Lock className="h-4 w-4 text-green-600" />
                    Secure Checkout - Your information is protected
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
