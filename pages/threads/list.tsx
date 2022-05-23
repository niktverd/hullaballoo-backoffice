import {useEffect, useState} from 'react';
import type {NextPage} from 'next';
import {Edit} from '@mui/icons-material';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';

import Page from '../../src/containers/Page/Page';
import {Thread} from '../../src/types/common';

import styles from '../../styles/Content.module.css'


const ThreadsList: NextPage = () => {
    const [threads, setThreads] = useState<Thread[]>([]);

    async function getThreads() {
        try {
            const threadsResp = await fetch(`/api/threads`);
            const threadsJson = await threadsResp.json();
            setThreads(threadsJson.threads);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getThreads();
    }, []);

    return (
        <Page title='Threads List'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID / Name</TableCell>
                        <TableCell align="right">Cards count</TableCell>
                        <TableCell align="right">Edit</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {threads.map((row: Thread) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row._id}
                        </TableCell>
                        <TableCell align="right">{row.cards?.length || 0}</TableCell>
                        <TableCell align="right">
                            <Link href={`/threads/${row._id}`}>
                                <IconButton>
                                    <Edit />
                                </IconButton>
                            </Link>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Page>
    );
}

export default ThreadsList;
