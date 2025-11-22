import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Answers to common questions about Water Nest products, services, delivery, and more.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h1>
      <p className="text-gray-600 mb-8">
        Find answers to common questions about Water Nest products, services, and policies.
      </p>

      <div className="space-y-8">
        {/* General Questions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">General Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="location">
              <AccordionTrigger>Where is Water Nest located?</AccordionTrigger>
              <AccordionContent>
                Water Nest operates from Kathu, Northern Cape, South Africa. Our physical address is available upon request for local customers requiring in-person consultations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="service-areas">
              <AccordionTrigger>What areas do you service?</AccordionTrigger>
              <AccordionContent>
                We primarily service the Northern Cape region, with particular focus on Kathu and surrounding mining communities. We also offer nationwide delivery throughout South Africa for our products.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept EFT (Electronic Funds Transfer), credit/debit cards (Visa, Mastercard), and cash on delivery for local orders in the Kathu area.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="installation">
              <AccordionTrigger>Do you offer installation services?</AccordionTrigger>
              <AccordionContent>
                Yes, we provide professional installation services for water filtration systems, purifiers, and treatment equipment within the Northern Cape region. Installation fees vary based on location and system complexity.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Product Questions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Product Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="sabs">
              <AccordionTrigger>Are your products SABS approved?</AccordionTrigger>
              <AccordionContent>
                Yes, all our water treatment products comply with South African Bureau of Standards (SABS) regulations and SANS 241 drinking water quality standards.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="testing">
              <AccordionTrigger>Do you offer water testing services?</AccordionTrigger>
              <AccordionContent>
                Yes, we provide comprehensive water testing services to assess water quality and recommend appropriate treatment solutions for your specific needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranty">
              <AccordionTrigger>What warranty do your products carry?</AccordionTrigger>
              <AccordionContent>
                Most products carry a 12-24 month manufacturer&apos;s warranty. Extended warranties are available for purchase. Warranty terms comply with the Consumer Protection Act 68 of 2008.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns">
              <AccordionTrigger>Can I return a product if it doesn&apos;t meet my needs?</AccordionTrigger>
              <AccordionContent>
                Yes, in accordance with the Consumer Protection Act, you have a cooling-off period to return products. See our Returns Policy for full details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Order & Delivery Questions */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Order & Delivery Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="delivery-time">
              <AccordionTrigger>How long does delivery take?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Local Kathu deliveries: 1-3 business days</li>
                  <li>Northern Cape: 3-5 business days</li>
                  <li>Nationwide: 5-10 business days depending on courier service and location</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery-cost">
              <AccordionTrigger>Do you charge for delivery?</AccordionTrigger>
              <AccordionContent>
                Delivery within Kathu town limits is free for orders over R1,500. Other areas incur courier charges based on weight and distance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tracking">
              <AccordionTrigger>Can I track my order?</AccordionTrigger>
              <AccordionContent>
                Yes, once your order is dispatched, you&apos;ll receive a tracking number via email and SMS.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="not-home">
              <AccordionTrigger>What if I&apos;m not home when delivery arrives?</AccordionTrigger>
              <AccordionContent>
                Our courier partners will attempt delivery twice. You can also arrange collection from their depot or schedule a convenient delivery time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Still Have Questions? */}
        <section className="bg-blue-50 p-6 rounded-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="mb-4">
            If you couldn&apos;t find the answer you were looking for, our customer service team is here to help.
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> info@waternest.co.za</p>
            <p><strong>Phone:</strong> 082 XXX XXXX</p>
            <p><strong>Hours:</strong> Monday-Friday, 8:00 AM - 5:00 PM SAST</p>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}
