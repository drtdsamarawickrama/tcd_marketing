import React from "react";

export default function TrustFactors() {
  return (
    <section className="bg-slate-100 border-y border-zinc-200 py-10 px-4 mb-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex gap-4 items-center">
          <div className="text-3xl text-red-600">🚛</div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-800">Free Islandwide Delivery</h4>
            <p className="text-xs text-slate-500">Free delivery for all furniture products.</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-3xl text-red-600">🛡️</div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-800">Official TCD Marketing Warranty</h4>
            <p className="text-xs text-slate-500">Reliable after-sales service and guarantee.</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-3xl text-red-600">💳</div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-800">Easy Installment Plans</h4>
            <p className="text-xs text-slate-500">Up to 60 months credit card schemes.</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-3xl text-red-600">🎧</div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-800">24/7 Hotline Support</h4>
            <p className="text-xs text-slate-500">Dedicated support on 0117 654 654.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
