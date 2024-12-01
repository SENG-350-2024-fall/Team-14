from fastapi import APIRouter, HTTPException
from models.VirtualTriage import VTTicket
from services.triage_service import get_tickets, create_ticket, update_ticket, delete_ticket
from typing import List

router = APIRouter()

@router.get("/tickets", response_model=List[VTTicket])
async def get_all_tickets():
    tickets = await get_tickets()
    if not tickets:
        raise HTTPException(status_code=404, detail="No tickets found")
    return tickets

@router.post("/tickets", response_model=VTTicket)
async def create_new_ticket(ticket: VTTicket):
    return await create_ticket(ticket)

@router.put("/tickets/{ticket_id}", response_model=VTTicket)
async def update_existing_ticket(ticket_id: int, ticket: VTTicket):
    return await update_ticket(ticket_id, ticket)

@router.delete("/tickets/{ticket_id}", response_model=dict)
async def delete_existing_ticket(ticket_id: int):
    return await delete_ticket(ticket_id)