import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  const handleStatusUpdate = async (complainId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/complains/${complainId}`, { status: newStatus });
      dispatch({ type: 'COMPLAIN_STATUS_UPDATED', payload: response.data });
    } catch (error) {
      console.error('Error updating complain status:', error);
    }
  };

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'typeOfTicket', label: 'Type of Ticket', minWidth: 100 },
    { id: 'location', label: 'Location', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'actions', label: 'Actions', minWidth: 100 }, // Added column for actions
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => ({
    user: complain.name,
    description: complain.description,
    typeOfTicket: complain.typeOfTicket,
    location: complain.location,
    date: complain.date.substring(0, 10), 
    id: complain._id,
  }));

  return (
    <>
      <h1>Service Request System</h1>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          Loading...
        </Box>
      ) : (
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {complainsList && complainsList.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {complainColumns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complainRows.map((row) => (
                    <TableRow key={row.id}>
                      {complainColumns.map((column) => (
                        <TableCell key={column.id}>
                          {column.id === 'actions' ? (
                            <Button onClick={() => handleStatusUpdate(row.id, 'Completed')}>
                              Update Status
                            </Button>
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              No Service Requests Right Now
            </Box>
          )}
        </Paper>
      )}
    </>
  );
};

export default SeeComplains;
