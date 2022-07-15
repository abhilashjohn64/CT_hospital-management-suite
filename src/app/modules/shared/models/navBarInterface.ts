export interface INavBarDetails{
name: string
designation: string,
menuItems: IMenuItem[]
}

export interface IMenuItem{
  title: string,
  matIconType : string
  path : string
}
