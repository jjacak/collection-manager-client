export type propsChildren = {
	children: React.ReactNode;
};
export interface CollectionItem {
    name: string,
	tags: string[],
	author: string,
	comments: { comment_author: string, comment_body: string }[],
	likes: string[],
}

export interface CollectionInterface {
	owner_id:string,
	tags?: string[],
	title: string,
	image?: string,
	cloudinary_id?: string,
	description: string,
	topic: string,
	items?:CollectionItem[];
}
