from pydantic import BaseModel

class ED( BaseModel ):
    locationID: int
    locationName: str
    Address: str
    currentLoad: int