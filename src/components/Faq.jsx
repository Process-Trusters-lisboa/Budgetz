import React from "react";

function Faq() {
  return (
    <div>
      <section>
        <div className="container mx-auto mt-16">
          <h2 className="mb-6 text-3xl font-semibold text-center md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-lg px-6 mx-auto text-center text-graishBlue">
            Here are some of our FAQs.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section>
        <div className="mx-auto px-6 mb-32">
          <div className="max-w-2xl m-8 mx-auto overflow-hidden">
            {/* Tab 1 */}
            <div className="py-1 border-b outline-none group" tabIndex="1">
              <div className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease">
                <div className="transition duration-500 ease group-hover:text-blue-500">
                  What is Budgetz?
                </div>
                {/* Arrow */}
                <div className="transition duration-500 ease group-focus:-rotate-180 group-focus:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="12"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      d="M1 1l8 8 8-8"
                    />
                  </svg>
                </div>
              </div>

              {/* Tab Inner Content */}
              <div className="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease">
                <p className="py-2 text-justify text-gray-500">
                  With Budgetz take control of your finances with our powerful
                  and easy-to-use budget tracker. Designed to help you stay on
                  top of your spending, save more, and reach your financial
                  goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faq;