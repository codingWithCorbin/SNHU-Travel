


// component that displays below page header to communicate any erros
function ErrorHeader({message}){


    return(

        <>
            {/* uses incoming message as props to handle a variety of errors from server response */}
            <div className="w-full h-[8vh] bg-red-200 place-items-center place-content-center">
                <h1 className="text-2xl">{message}</h1>
            </div>
        
        </>
    )
}

export default ErrorHeader