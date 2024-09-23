from pydantic import BaseModel

class ItemResponse(BaseModel):
    id: int
    name: str
    description: str = None

    class Config:
        orm_mode = True


