import {useEffect, useState} from 'react';
import type {NextPage} from 'next';
import {Edit} from '@mui/icons-material';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';

import Page from '../../src/containers/Page/Page';
import {Offer} from '../../src/types/common';

import styles from '../../styles/Content.module.css'

const OffersList: NextPage = () => {
    const [offers, setOffers] = useState<Offer[]>([]);

    async function getOffers() {
        try {
            const offersResp = await fetch(`/api/offers`);
            const offersJson = await offersResp.json();
            setOffers(offersJson.offers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOffers();
    }, []);

    return (
        <Page title='Offers List'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID / Name</TableCell>
                        <TableCell align="right">Link</TableCell>
                        <TableCell align="right">Banners count</TableCell>
                        <TableCell align="right">Edit</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {offers.map((row: Offer) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <div>
                                {row.name}
                            </div>
                            <div>
                                {row._id}
                            </div>
                        </TableCell>
                        <TableCell align="right">{row.buttonLink.slice(0, 32)}</TableCell>
                        <TableCell align="right">{row.banners?.length || 0}</TableCell>
                        <TableCell align="right">
                            <Link href={`/offers/${row._id}`}>
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

export default OffersList;
