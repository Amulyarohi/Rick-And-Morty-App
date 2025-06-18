import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
};

type APIResponse = {
  info: {
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

export default function CharacterList() {
  const search = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });
  const page = search.page;

  const {
    data,
    refetch, // 👈 For Refresh button
  } = useQuery<APIResponse>({
    queryKey: ['characters', page],
    queryFn: () =>
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then((res) => res.data),
    placeholderData: (prev) => prev,
  });

  const columns = React.useMemo<ColumnDef<Character>[]>(() => [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'species', header: 'Species' },
  ], []);

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePageChange = (newPage: number) => {
    navigate({
      to: '/',
      search: { page: newPage },
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => refetch()}>
          🔄 Refresh
        </button>
      </div>

      <table border={1}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate({ to: `/character/${row.original.id}` })}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span style={{ margin: '0 1rem' }}>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={data && page >= data.info.pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
