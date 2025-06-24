'use client';

import { ParkDataProvider } from '@/app/_lib/contexts/ParkDataContext';
import AppNav from '@/app/_components/AppNav';
import Pagination from '@/app/_components/Pagination';
import BookmarkList from '@/app/_components/BookmarkList';

export default function BookmarkLayout({
  bookmarks,
  count,
  sort,
  query,
  page,
}) {
  return (
    <ParkDataProvider value={{ bookmarks, sort, query, page }}>
      <AppNav />
      <BookmarkList />
      <footer>
        <Pagination count={count} />
      </footer>
    </ParkDataProvider>
  );
}
