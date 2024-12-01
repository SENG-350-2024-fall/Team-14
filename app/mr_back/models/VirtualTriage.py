from pydantic import BaseModel
from typing import List
from .ED import ED

class generalSymptoms( BaseModel ):
    fever: bool
    chills: bool
    fatigue: bool
    weakness: bool
    weightChange: bool
    nightSweats: bool

class respiratorySymptoms( BaseModel ):
    cough: bool
    shortnessOfBreath: bool
    wheezing: bool
    soreThroat: bool
    nasalCongestion: bool
    chestPain: bool

class gastrointestinalSymptoms( BaseModel ):
    nausea: bool
    vomiting: bool
    diarrhea: bool
    constipation: bool
    abdominalPain: bool
    appetiteLoss: bool

class neurologicalSymptoms( BaseModel ):
    headache: bool
    dizziness: bool
    numbness: bool
    confusion: bool
    memoryLoss: bool
    seizures: bool

class musculoskeletalSymptoms( BaseModel ):
    jointPain: bool
    musclePain: bool
    stiffness: bool
    backPain: bool

class cardiovascularSymptoms( BaseModel ):
    palpitations: bool
    swellinglegsAnkles: bool
    chestPain: bool
    acceleratedHeartbeat: bool

class skinSymptoms( BaseModel ):
    rash: bool
    itching: bool
    bruising: bool
    wounds: bool

class psychologicalSymptoms( BaseModel ):
    anxiety: bool
    depression: bool
    moodSwings: bool
    sleepPatternChanges: bool

class substanceHabits( BaseModel ):
    alcohol: bool
    smoking: bool
    drugs: bool

class VTTicket( BaseModel ):
    ticketID: int
    user: str
    ED: ED
    durationOfSymptoms: str
    listAllergies: str
    pastMedicalConditions: str
    generalSymptoms: generalSymptoms
    respiratorySymptoms: respiratorySymptoms
    gastrointestinalSymptoms: gastrointestinalSymptoms
    neurologicalSymptoms: neurologicalSymptoms
    musculoskeletalSymptoms: musculoskeletalSymptoms
    cardiovascularSymptoms: cardiovascularSymptoms
    skinSymptoms: skinSymptoms
    psychologicalSymptoms: psychologicalSymptoms
    substanceHabits: substanceHabits
    consent: bool
    timestamp: str