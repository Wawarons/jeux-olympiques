export type linksListType = {
    title: string | "",
    href: string | "#"
}

type LinksListProps = {
    classLink?: string,
    linksList: linksListType[],
}


const LinksList = ({classLink, linksList}: LinksListProps) => {
  return (
    <>
    {linksList.map((link, index) => {
        return (
            <a
              href={link.href}
              className={classLink}
              key={`${link.title}_${index}`}
            >
              {link.title}
            </a>
        );
      })}

      </>

  )
}

export default LinksList