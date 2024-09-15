import { useEffect, useState } from "react"
import { useNavigate,useLocation } from "react-router-dom"
import { useForm } from 'react-hook-form';

const Home = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm()

    const [data, setdata] = useState([])
    const [urlid, seturlid] = useState()
    const [Name, setName] = useState()
    const navigate = useNavigate()
    const location = useLocation()

    const uuid = location.state || {}

    const handledata = async () => {
        try {
            
            const response = await fetch(`http://localhost:1927/url/all`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({uuid}),
                credentials: 'include'
            })
            // console.log(response);
            const res = await response.json()
            if (!(res.status)) {
                alert("Failed to fetch infomation\n",res.message)
                console.log("res : ",res);
                
                navigate("/login")
                return
            }
            // console.log("res : ", res);
            setdata(res.urls)
            // console.log("data : ", data);
        } catch (error) {
            console.error("something is wrong")
        }

    }

    useEffect(() => {
        handledata()
    }, [])

    // useEffect(() => {
    //     console.log("data : ", data);
    // }, [data]);

    const onSubmit = async (data) => {
        const response = await fetch("http://localhost:1927/url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data,uuid}),
            credentials: 'include',
        })
        const res = await response.json()
        console.log("res : ",res);
        
        if (!(res.status)) {
            let msg = "Couldn't add data to database"
            seturlid(msg)
            return
        }
        let msg = `http://localhost:1927/${res.shorturl}`
        seturlid(msg)
        return
    }



    return (
        <>
            <div className="generate">
                {Name && <h1>{Name}</h1>}
                <h2>Short URL Generator</h2>
                <div className="form_d">
                    <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Enter valid URL : (https://example.com)" {...register('url', {
                            required: 'URL is required',
                            pattern: {
                                value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
                                message: 'Invalid URL format'
                            }
                        })} />
                        <div className="errors">
                            {errors.url && errors.url.message}
                        </div>
                        <button type="submit">Generate</button>
                    </form>
                </div>
            </div>
            {urlid && (<div className="url-generated">
                URL Generated : <strong>{urlid}</strong>
            </div>)}
            {data && (<div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Short Id</th>
                            <th>Redirect Link</th>
                            <th>Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((url, index) => (
                            <tr key={url._id}>
                                <td>{index + 1}</td>
                                <td>{url.shortID}</td>
                                <td>{url.redirectUrl}</td>
                                <td>{url.visited.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </>
    )
}

export default Home
