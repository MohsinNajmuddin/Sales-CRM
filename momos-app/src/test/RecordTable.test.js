import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordTable from '../Components/Record Table/RecordTable';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

describe('RecordTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays records correctly', async () => {
    const fakeRecords = [
      {
        Name: 'Record 1',
        Company: 'Company A',
        Status: 'Closed',
        Priority: 'High',
        EstimatedValue: 100,
        AccountOwner: 'User 1',
      },
      {
        Name: 'Record 2',
        Company: 'Company B',
        Status: 'Negotiation',
        Priority: 'Medium',
        EstimatedValue: 200,
        AccountOwner: 'User 2',
      },
    ];

    // Mock useState to return the fake records
    React.useState.mockReturnValue([fakeRecords, jest.fn()]);

    // Mock useEffect to not do anything
    React.useEffect.mockImplementationOnce((f) => f());

    render(<RecordTable />);

    // Check that the table headers are displayed
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Estimated Value')).toBeInTheDocument();
    expect(screen.getByText('Account Owner')).toBeInTheDocument();

    // Check that the table rows are displayed with the correct data
    expect(screen.getByText('Record 1')).toBeInTheDocument();
    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('User 1')).toBeInTheDocument();

    expect(screen.getByText('Record 2')).toBeInTheDocument();
    expect(screen.getByText('Company B')).toBeInTheDocument();
    expect(screen.getByText('Negotiation')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
  });
});
