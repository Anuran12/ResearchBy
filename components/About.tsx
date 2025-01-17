import React from "react";

function About() {
  return (
    <div className="flex flex-col items-center justify-start py-10">
      <h1 className="text-[3vw] font-bold">About Us</h1>
      <p className="text-[1.2vw] text-[#5F5F5F] text-center">
        Experience the future of research with our cutting-edge AI technology
        and professional network integration.
      </p>
      <div className="w-full flex px-[6.5vw] pt-16">
        <div className="w-[50%] flex flex-col items-start justify-center gap-5">
          <h1 className="text-[3.8vw] font-semibold">About ResearchBy.ai</h1>
          <p className="text-[1.2vw] text-[#A6A6A6]">
            We're revolutionizing research with AI technology, making
            high-quality research accessible to everyone.
          </p>
          <p className="text-[1.2vw] text-[#A6A6A6]">
            At ResearchBy.ai, we believe that quality research should be
            accessible to everyone. Our platform combines cutting-edge AI
            technology with professional network insights to democratize the
            research process.
          </p>
        </div>
        <div className="w-[50%] pl-16 flex flex-col items-start justify-center gap-5">
          <div className="flex gap-5">
            <div className="p-3 shadow-md w-fit h-fit rounded-lg bg-white">
              <svg
                width="28"
                height="26"
                viewBox="0 0 28 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.5 13H21.5L17.75 24.25L10.25 1.75L6.5 13H1.5"
                  stroke="#FBE06A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-[1.8vw] font-bold">Lightning Fast</h1>
              <p className="text-[1.2vw] text-[#A6A6A6]">
                Generate comprehensive research documents in minutes, not hours
                or days.
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="p-3 shadow-md w-fit h-fit rounded-lg bg-white">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.512 19.8626C25.7168 21.7432 24.473 23.4004 22.8894 24.6892C21.3057 25.9781 19.4305 26.8594 17.4276 27.2561C15.4247 27.6528 13.3551 27.5528 11.3997 26.9648C9.44436 26.3769 7.66281 25.3189 6.2108 23.8834C4.75879 22.4479 3.68055 20.6785 3.07032 18.73C2.4601 16.7815 2.33648 14.7132 2.71027 12.7059C3.08407 10.6986 3.9439 8.81338 5.21458 7.21513C6.48527 5.61689 8.12813 4.35424 9.99953 3.5376"
                  stroke="#FADE5A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27.5 15C27.5 13.3585 27.1767 11.733 26.5485 10.2165C25.9203 8.69989 24.9996 7.3219 23.8388 6.16117C22.6781 5.00043 21.3001 4.07969 19.7835 3.45151C18.267 2.82332 16.6415 2.5 15 2.5V15H27.5Z"
                  stroke="#FADE5A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-[1.8vw] font-bold">Professional Network</h1>
              <p className="text-[1.2vw] text-[#A6A6A6]">
                Access insights from industry experts and professional
                databases.
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="p-3 shadow-md w-fit h-fit rounded-lg bg-white">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 1.75C19.5054 1.75 18.5516 2.14509 17.8483 2.84835C17.1451 3.55161 16.75 4.50544 16.75 5.5V20.5C16.75 21.4946 17.1451 22.4484 17.8483 23.1517C18.5516 23.8549 19.5054 24.25 20.5 24.25C21.4946 24.25 22.4484 23.8549 23.1517 23.1517C23.8549 22.4484 24.25 21.4946 24.25 20.5C24.25 19.5054 23.8549 18.5516 23.1517 17.8483C22.4484 17.1451 21.4946 16.75 20.5 16.75H5.5C4.50544 16.75 3.55161 17.1451 2.84835 17.8483C2.14509 18.5516 1.75 19.5054 1.75 20.5C1.75 21.4946 2.14509 22.4484 2.84835 23.1517C3.55161 23.8549 4.50544 24.25 5.5 24.25C6.49456 24.25 7.44839 23.8549 8.15165 23.1517C8.85491 22.4484 9.25 21.4946 9.25 20.5V5.5C9.25 4.50544 8.85491 3.55161 8.15165 2.84835C7.44839 2.14509 6.49456 1.75 5.5 1.75C4.50544 1.75 3.55161 2.14509 2.84835 2.84835C2.14509 3.55161 1.75 4.50544 1.75 5.5C1.75 6.49456 2.14509 7.44839 2.84835 8.15165C3.55161 8.85491 4.50544 9.25 5.5 9.25H20.5C21.4946 9.25 22.4484 8.85491 23.1517 8.15165C23.8549 7.44839 24.25 6.49456 24.25 5.5C24.25 4.50544 23.8549 3.55161 23.1517 2.84835C22.4484 2.14509 21.4946 1.75 20.5 1.75Z"
                  stroke="#FBE06A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-[1.8vw] font-bold">Quality Assured</h1>
              <p className="text-[1.2vw] text-[#A6A6A6]">
                AI-powered verification ensures accurate and reliable content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
