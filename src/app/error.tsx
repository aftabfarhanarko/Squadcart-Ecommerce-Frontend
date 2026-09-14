"use client";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";
import { MdSentimentDissatisfied } from "react-icons/md";

const ErrorPage = () => {
  return (
    <div className="px-4">
      <div className="flex flex-col items-center justify-center my-12 bg-white shadow-sm rounded-md mx-auto max-w-screen-sm  p-6">
        <Image
          alt="Error"
          height={300}
          width={300}
          src="https://res.cloudinary.com/dffqrc36j/image/upload/v1730562569/server_error_w0x6oq.svg"
        />
        <div className="text-2xl text-neutral-600 font-semibold flex items-center gap-2">
          Sorry <MdSentimentDissatisfied className="text-amber-700" />
        </div>
        <p className="text-sm text-gray-500 mb-2 md:mb-8 px-3 md:px-32 text-center">
          Something went wrong!
        </p>
        <Link href="/">
          <Button iconPosition="end" icon={<BiChevronRight />} type="primary">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
