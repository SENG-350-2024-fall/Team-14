from pymongo import MongoClient
from fastapi import HTTPException, status
from models.VirtualTriage import VTTicket
from typing import List

# MongoDB connection
uri = 'mongodb+srv://admin:admin@mrcluster.lrupm.mongodb.net/'
client = MongoClient(uri)
db = client['mr_data']
tickets_collection = db['VTTickets']

async def get_tickets() -> List[VTTicket]:
    try:
        tickets = list(tickets_collection.find({}, {'_id': 0}))  # Exclude the MongoDB _id field
        return tickets
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

async def create_ticket(ticket: VTTicket) -> VTTicket:
    try:
        ticket_dict = ticket.dict()
        tickets_collection.insert_one(ticket_dict)
        return ticket
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

async def update_ticket(ticket_id: int, ticket: VTTicket) -> VTTicket:
    try:
        result = tickets_collection.update_one({"ticketID": ticket_id}, {"$set": ticket.dict()})
        if result.matched_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found")
        return ticket
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

async def delete_ticket(ticket_id: int) -> dict:
    try:
        result = tickets_collection.delete_one({"ticketID": ticket_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found")
        return {"message": "Ticket deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))