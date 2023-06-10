import { Ticket } from "../interfaces/ticket";

export const tickets: Ticket[] = [
    {
        id:'1',
        title: 'task1',
        projectId: '2',
        assignedTo: '3',
        description: 'description1',
        createDate: new Date(),
        updateDate: new Date(),
        status: 'open',
        priority: 'Low'
    },
    {
        id:'2',
        title: 'task2',
        projectId: '3',
        assignedTo: '4',
        description: 'description2',
        createDate: new Date(),
        updateDate: new Date(),
        status:'open',
        priority: 'Medium'
    },
    {
        id:'3',
        title: 'task3',
        projectId: '3',
        assignedTo: '4',
        description: 'description3',
        createDate: new Date(),
        updateDate: new Date(),
        status:'open',
        priority: 'Low'
    },
    {
        id:'4',
        title: 'task4',
        projectId: '4',
        assignedTo: '5',
        description: 'description4',
        createDate: new Date(),
        updateDate: new Date(),
        status:'open',
        priority: 'High'
    },
    {
        id:'5',
        title: 'task5',
        projectId: '5',
        assignedTo: '6',
        description: 'description5',
        createDate: new Date(),
        updateDate: new Date(),
        status:'open',
        priority: 'Low'
    }
]
