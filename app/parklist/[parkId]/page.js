import { getPark, getParkLists } from '@/app/_lib/data-service';
import Park from '@/app/_components/Park';
import { Suspense } from 'react';
import Spinner from '@/app/_components/Spinner';

export async function generateMetadata({ params }) {
  try {
    const { name } = await getPark(params.parkId);
    return { title: `Park ${name}` };
  } catch (err) {
    console.error('[Metadata Error]', err);
    return { title: 'Park Detail' };
  }
}

export async function generateStaticParams() {
  try {
    const { data: parkLists } = await getParkLists();
    if (!Array.isArray(parkLists)) return [];

    return parkLists.map((park) => ({ parkId: String(park.id) }));
  } catch (err) {
    console.error('[Static Params Error]', err);
    return [];
  }
}

export default async function Page({ params }) {
  try {
    if (!params?.parkId) {
      throw new Error('Missing parkId in params.');
    }

    const park = await getPark(params.parkId);

    if (!park) {
      return (
        <div className='text-center text-red-500 mt-10'>
          <h2 className='text-lg font-semibold'>Park not found</h2>
          <p>We couldn’t find a park with ID: {params.parkId}</p>
        </div>
      );
    }

    return (
      <div className='flex items-center justify-center'>
        <Suspense fallback={<Spinner />}>
          <Park park={park} />
        </Suspense>
      </div>
    );
  } catch (err) {
    console.error('[Park Detail Page Error]', err);

    return (
      <div className='text-center text-red-500 mt-10'>
        <h2 className='text-lg font-semibold'>Failed to load park</h2>
        <p>{err.message}</p>
      </div>
    );
  }
}
