import React, {useState} from 'react';
import SHOP_DATA from '../assets/shop.data';
import { CollectionPreview } from '../components/collection_preview';

export const ShopPage = () => {
	const [state, setstate] = useState({
		collections: SHOP_DATA
	})

	return (
		<div className='shop-page'>
			{
				state.collections
					.map(({id, ...otherCollectionProps}) => (
						<CollectionPreview key={id} {...otherCollectionProps} />	
					))
			}
		</div>
	)
}