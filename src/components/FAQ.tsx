import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItemProps = {
  question: string;
  answer: React.ReactNode;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full justify-between items-center text-left font-medium text-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="ml-4 flex-shrink-0 text-hibachi-red">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 prose-sm max-w-none">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="py-16 bg-white" id="faq">
      <div className="container max-w-4xl mx-auto px-4">


        <div className="space-y-1">
          <FAQItem
            question="What areas do you serve?"
            answer={
              <p>
                We proudly serve the entire East Coast, including but not limited to Washington DC, Maryland, Virginia, Delaware, Pennsylvania, New Jersey, and New York.
              </p>
            }
          />
          
          <FAQItem
            question="How far in advance should I book?"
            answer={
              <p>
                We recommend booking at least 1 week in advance to ensure availability, especially during 
                peak seasons (summer months and holidays). For larger events or special occasions, booking 
                1-2 months ahead is advisable. Last-minute bookings may be accommodated based on chef availability.
              </p>
            }
          />
          
          <FAQItem
            question="What is included in your hibachi catering package?"
            answer={
              <>
                <p>Our standard hibachi catering packages include:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Professional hibachi chef</li>
                  <li>All necessary cooking equipment</li>
                  <li>High-quality ingredients for your selected menu</li>
                  <li>Preparation, cooking, and serving</li>
                  <li>Basic cleanup of cooking area</li>
                  <li>Disposable plates, utensils, and napkins</li>
                </ul>
                <p className="mt-2">
                  Premium packages may include additional services such as appetizers, desserts, 
                  specialty menu items, and enhanced presentation options.
                </p>
              </>
            }
          />
          
          <FAQItem
            question="Do you accommodate dietary restrictions and allergies?"
            answer={
              <p>
                Yes, we can accommodate various dietary restrictions including vegetarian, vegan, 
                gluten-free, and specific allergies. Please inform us of any dietary needs when booking, 
                and our chefs will prepare accordingly. For severe allergies, we recommend discussing 
                directly with our team to ensure proper precautions are taken.
              </p>
            }
          />
          
          <FAQItem
            question="What is the minimum and maximum group size?"
            answer={
              <p>
                Our standard services accommodate groups from 10+ people per chef. Our minimum is 10 guests.
                Please contact us for custom arrangements for very large events.
              </p>
            }
          />
          
          <FAQItem
            question="What space requirements do you need for setup?"
            answer={
              <>
                <p>
                  For a comfortable hibachi experience, we typically need:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>A flat, stable surface for our portable grill</li>
                  <li>Approximately 6' x 6' space for the chef to work</li>
                  <li>Adequate ventilation</li>
                  <li>Access to electrical outlets</li>
                  <li>Reasonable access to water</li>
                </ul>
                <p className="mt-2">
                  We can work with various indoor and outdoor settings, including homes, offices, 
                  event venues, and outdoor spaces. Our team will discuss specific requirements 
                  during the booking process.
                </p>
              </>
            }
          />
          <FAQItem
            question="Where can I make changes to my order? "
            answer={
              <p>
                Please call or text us at (929) 688-1138 to modify your booking. We will do our best to accommodate your request.
              </p>
            }
          />
          
          <FAQItem
            question="What is your cancellation policy?"
            answer={
              <p>
                Please call or text us at (929) 688-1138 to cancel your booking. We will do our best to accommodate your request.
              </p>
            }
          />
          
          <FAQItem
            question="Can I customize the menu?"
            answer={
              <p>
                Absolutely! While we offer standard menu packages, we're happy to customize the menu 
                to suit your preferences and event needs. From protein selections to vegetable options 
                and special sauces, we can tailor the experience to your taste. Custom menus may affect 
                pricing, so please contact us to discuss your specific requirements.
              </p>
            }
          />
          
          <FAQItem
            question="Do you provide the full hibachi entertainment experience?"
            answer={
              <p>
                Yes! Our chefs are trained not just in cooking delicious food but also in providing 
                the full hibachi entertainment experience, including knife skills, cooking tricks, 
                and interactive elements that make hibachi dining special. The level of showmanship 
                can be adjusted based on your preferences and the nature of your event.
              </p>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;