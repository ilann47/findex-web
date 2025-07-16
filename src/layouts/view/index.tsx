import { ViewLayoutContent } from './content'
import { ViewLayoutHeader } from './header'
import { ViewLayoutHeaderRightElements } from './header/right'
import { ViewLayoutHeaderTitle } from './header/title'
import { ViewLayoutRoot } from './root'
import { ViewLayoutSections } from './sections'

export const ViewLayout = {
	Root: ViewLayoutRoot,
	Sections: ViewLayoutSections,
	Header: {
		Root: ViewLayoutHeader,
		Title: ViewLayoutHeaderTitle,
		RightElements: ViewLayoutHeaderRightElements,
	},
	Content: ViewLayoutContent,
}
