import { Suspense } from "react";
import PracticeClient from "../../components/practice/practice.client";

export default function PracticePage() {
  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <Suspense fallback={<div>Loading...</div>}>
          <PracticeClient />
        </Suspense>
      </div>
    </section>
  );
}