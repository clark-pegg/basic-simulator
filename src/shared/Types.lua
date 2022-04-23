local Types = {}

export type Egg = {
	Price: number,
}

export type Pet = {
	Egg: Egg,
	Multiplier: number,
}

export type Mice = {
	Price: number,
	Power: number,
}

export type Bags = {
	Price: number,
	Size: number,
}

export type PlayerData = {
	Clicks: number,
	Money: number,
	Pets: {
		Equipped: {
			[number]: number,
		},
		[number]: Pet,
	},
	Inventory: {
		Mice: {
			Equipped: number,
			[number]: Mice,
		},
		Bags: {
			Equipped: number,
			[number]: Bags,
		},
	},
}

return Types
