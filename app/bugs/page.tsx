import React from 'react'
import { Table, TableCell } from '@radix-ui/themes'
import Link from '../components/Link'
import BugToolbar from './BugToolbar'
import prisma from '@/prisma/client'
import BugStatusBadge from '../components/BugStatusBadge'
import delay from 'delay'

const BugsPage = async () => {
    const bugs = await prisma.bug.findMany()
    await delay(2000)

    return (
        <div>
            <BugToolbar />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Bug</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{bugs.map(bug => {
                    return (
                        <Table.Row key={bug.id}>
                            <TableCell>

                                <Link href={`/bugs/${bug.id}`}>
                                    {bug.title}
                                </Link>
                                <div className='block md:hidden'>{bug.status}</div>
                            </TableCell>
                            <TableCell className='hidden md:table-cell'>
                                <BugStatusBadge status={bug.status} />
                            </TableCell>
                            <TableCell className='hidden md:table-cell'>{bug.createdAt.toDateString()}</TableCell>
                        </Table.Row>)
                })}</Table.Body>
            </Table.Root>
        </div>
    )
}

export default BugsPage