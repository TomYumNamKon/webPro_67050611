const categoryFor = (category, title) => {
  if (/headphone|earphone|earbud|airpod|homepod|speaker|echo plus/i.test(title)) return 'Audio'
  if (['laptops', 'tablets'].includes(category)) return 'Computer'
  if (/^(mens-|womens-)|^(beauty|fragrances|skin-care|sunglasses|tops)$/.test(category)) return 'Fashion'
  if (['smartphones', 'mobile-accessories'].includes(category)) return 'Gadget'
  return 'Other'
}

export function normalizeProduct(item) {
  if (!item || !Number.isFinite(item.id) || typeof item.title !== 'string' || !item.title.trim() || !Number.isFinite(item.price)) return null
  return {
    id: item.id,
    name: item.title,
    price: item.price,
    currencyCode: 'USD',
    image: typeof item.thumbnail === 'string' ? item.thumbnail : (Array.isArray(item.images) && typeof item.images[0] === 'string' ? item.images[0] : ''),
    category: categoryFor(item.category, item.title),
    description: typeof item.description === 'string' ? item.description : '',
    rating: Number.isFinite(item.rating) ? item.rating : null,
    reviews: Array.isArray(item.reviews) ? item.reviews.length : null,
  }
}

export const currency = (value, currencyCode = 'USD') => new Intl.NumberFormat(currencyCode === 'THB' ? 'th-TH' : 'en-US', {
  style: 'currency', currency: currencyCode,
}).format(value)
