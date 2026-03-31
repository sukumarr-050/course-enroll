import { useLocation, Link } from "react-router-dom";

const PaymentStatusPage = ({ success }) => {
  const { search } = useLocation();
  const courseId = new URLSearchParams(search).get("courseId");

  return (
    <section className="mx-auto mt-20 max-w-xl rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
      <h1 className={`mb-2 text-2xl font-bold ${success ? "text-emerald-400" : "text-rose-400"}`}>
        {success ? "Payment Successful" : "Payment Cancelled"}
      </h1>
      <p className="mb-4 text-slate-300">
        {success
          ? `Your payment is complete.${courseId ? ` Course ID: ${courseId}` : ""}`
          : "No money was charged. You can try again anytime."}
      </p>
      <Link to="/courses" className="rounded bg-indigo-600 px-4 py-2">
        Back to Courses
      </Link>
    </section>
  );
};

export default PaymentStatusPage;
