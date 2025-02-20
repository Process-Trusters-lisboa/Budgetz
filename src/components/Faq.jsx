import React from "react";

function Faq() {

  return (
    <div>
      <section>
        <div className="container mx-auto mt-16 min-h-full">
          <h2 className="mb-6 text-3xl text-center md:text-4xl text-gray-500 font-bold">
            Frequently Asked Questions
          </h2>
          <p className="max-w-lg px-6 mx-auto text-center text-gray-500 font-bold">
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


                 {/* Tab 2 */}
                 <div className="py-1 border-b outline-none group" tabIndex="2">
              <div className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease">
                <div className="transition duration-500 ease group-hover:text-blue-500">
                Can I track my expenses on my phone?
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
                  Yes, you to track your expenses on the go. You can easily record purchases, check your budget, and review your progress from your phone.

                </p>
              </div>
            </div>


                 {/* Tab 3 */}
                 <div className="py-1 border-b outline-none group" tabIndex="3">
              <div className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease">
                <div className="transition duration-500 ease group-hover:text-blue-500">
                  Why should I have a Budget?
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
                Having a budget helps you keep track of your spending, save money, and avoid overspending. It gives you more control over your financial situation.
                </p>
              </div>
            </div>

                 {/* Tab 4 */}
                 <div className="py-1 border-b outline-none group" tabIndex="4">
              <div className="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease">
                <div className="transition duration-500 ease group-hover:text-blue-500">
                How often should I review my budget?
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
                It's a good idea to review your budget at least once a month to make sure you're staying on track and adjusting as needed.
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