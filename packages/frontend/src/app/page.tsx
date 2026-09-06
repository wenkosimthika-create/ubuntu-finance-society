import AppLayout from '@/components/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="bg-warm-sand bg-opacity-20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-forest-green mb-4">
            Welcome to Ubuntu Finance Society
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            A digital audit platform for community financial groups. The group keeps the money. We keep the record.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
              Sign In
            </button>
            <button className="bg-copper text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
              Learn More
            </button>
            <button className="border-2 border-forest-green text-forest-green px-6 py-3 rounded-lg hover:bg-forest-green hover:text-white transition">
              Contact Us
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-l-4 border-forest-green pl-4 py-4">
            <h3 className="text-xl font-bold text-forest-green mb-2">Transparency</h3>
            <p className="text-gray-600">Complete audit trail for all transactions</p>
          </div>
          <div className="border-l-4 border-warm-sand pl-4 py-4">
            <h3 className="text-xl font-bold text-forest-green mb-2">Governance</h3>
            <p className="text-gray-600">Structured rules and voting records</p>
          </div>
          <div className="border-l-4 border-copper pl-4 py-4">
            <h3 className="text-xl font-bold text-forest-green mb-2">Trust</h3>
            <p className="text-gray-600">Immutable records protect everyone</p>
          </div>
          <div className="border-l-4 border-forest-green pl-4 py-4">
            <h3 className="text-xl font-bold text-forest-green mb-2">Community</h3>
            <p className="text-gray-600">Built for African financial groups</p>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-forest-green mb-4">Our Mission</h3>
          <p className="text-gray-700 mb-4">
            Ubuntu Finance Society increases trust and transparency in community financial groups by creating a permanent digital audit trail.
          </p>
          <p className="text-gray-700">
            We support Stokvels, Savings Clubs, Lending Pools, Emergency Funds, Community Investment Clubs, and Cooperative Financial Groups.
          </p>
        </section>
      </div>
    </AppLayout>
  );
}
