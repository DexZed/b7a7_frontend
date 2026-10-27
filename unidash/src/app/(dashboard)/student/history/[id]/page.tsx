"use client";
import { useParams } from "next/navigation";
import PageHeading from "@/components/pageHeading";

function PaymentDetails() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <section className="flex flex-col w-full h-full p-4 gap-4">
        <PageHeading title="Payment Details" />
      </section>
    </>
  );
}

export default PaymentDetails;
