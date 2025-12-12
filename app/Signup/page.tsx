import { Suspense } from "react";
import SignupClient from "./SignupClient";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading signup…</div>}>
      <SignupClient />
    </Suspense>
  );
}
