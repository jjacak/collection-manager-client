export type propsChildren = {
	children: React.ReactNode;
};
export interface CollectionItem {
	name: {value:string, label:string, type:string};
	tags: string[];
	author: string;
	comments: { comment_author: string; comment_body: string }[];
	likes: string[];
	_id: string;
	date:Date;
}

export interface CollectionInterface {
	owner_id: string;
	owner_name?: string;
	tags?: string[];
	title: string;
	image?: string;
	cloudinary_id?: string;
	description: string;
	topic: string;
	items?: CollectionItem[];
	_id:string
}

