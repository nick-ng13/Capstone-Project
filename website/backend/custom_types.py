from pydantic import BaseModel

class Entry_data(BaseModel):
    data: list[dict]
# class Entry_(BaseModel):
#     Timestamp: str
#     total_count: int
#     parkade: str

class Entry_list(Entry_data):
    num_of_days: int
