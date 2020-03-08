export class Foyer_VM
{
    // public Foyer_VM()
    // {
    //     this.SystemConfigurations = new List<SystemConfiguration>();
    //     this.Slides = new List<Foyer_Slide>();
    // }

    Slides:Array<Foyer_Slide> = [];
    SystemConfigurations: Array<SystemConfiguration>=[]; 
}

export class  Foyer_Slide
{
     TabId: string;
     TabTitle: string;
     Title: string;
     SponsorshipType: string;
     Content: string;
}

export class RaviSabha_VM
{
    Id: number;
    SabhaDate: Date;
    Description: string;
    IsActiveForAttendance: boolean;
    Notes: string;
    KitchenCount:  number;
    IsDeleted: boolean;
    SabhaShortDate: string;
    SabhaDateMMMYY: string;
    SabhaDateWithDesc: string;
    IsCurrentWeek: boolean;
}

export class Sponsorship_VM
{
    Id: number;
    RaviSabhaId: number;
    SponsorshipTypeId: number;
    ReasonTypeId: number;
    SponsorId: number;
    SponsorDetail: string;
    Note: string;
    IsDeleted: boolean;

    SabhaShortDate: string;
    SabhaDateMMMYY: string;
    SabhaDateYY: number;
    SabhaDateMM: number;
    RaviSabhaDescription: string;
    RaviSabhaNotes: string;
    ReasonTypeName: string;
    SponsorshipTypeName: string;
    SponsorshipTypeIcon: string;
    SponsorshipDateBasedOnType: string;
}

export class Sponsor_VM
{
    Id: number;
    FirstName: string;
    LastName: string;
    SpouseName: string;
    City: string;
    FamilyMembers: string;
    IsDeleted: boolean;
    FullNameWithSpouseAndAddress: string;
    Sponsorships: Array<Sponsorship_VM>: [];
}

export class class SystemConfiguration_VM
{
    public int Id: string;
     Name: string;
     Value: string;
     ValidValues: string;
    public bool HasValidValues: string;
    public List<string> ValidValuesArray: string;
}