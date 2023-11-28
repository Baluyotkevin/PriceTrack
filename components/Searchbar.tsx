"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url: string) => {
    try {

        const parsedURL = new URL(url);
        const hostName = parsedURL.hostname;
        // Check if hostname contains amazon.com or amazon.
        if(hostName.includes('amazon.com') ||
            hostName.includes('amazon.') ||
            hostName.endsWith('amazon')
        ) {
            return true;
        }
    } catch (err: any) {
        return false;
    }

    return false;
}

function Searchbar() {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURL(searchPrompt)

        // alert(isValidLink ? 'Valid Link' : 'Invalid link')
        if (!isValidLink) return alert('Please provice a valid Amazon link')

        try {
            setIsLoading(true);

            // Scraping product page
            const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (err: any) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>

        <input 
        type='text'
        placeholder="Enter product link"
        className='searchbar-input'
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        />
        <button type="submit" className='searchbar-btn' disabled={searchPrompt === ''}>
            {isLoading ? "Searching..." : 'Search'}
        </button>
    </form>
  )
}

export default Searchbar;