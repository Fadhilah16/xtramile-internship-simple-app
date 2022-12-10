import Pagination from 'react-bootstrap/Pagination';

export default function PaginationComponent({ size, totalData, paginate, currentPage }){
       
    let items = [];
    for (let number = 0; number <=  Math.ceil(totalData / size)+1; number++) {

        if (number===0 && currentPage!==1){
            items.push((<Pagination.Prev onClick={()=>paginate(currentPage-1)} /> )); 
        }else if(number === Math.ceil(totalData / size)+1 && currentPage!==Math.ceil(totalData / size)){
            items.push((<Pagination.Next onClick={()=>paginate(currentPage+1)}/>));
        }else if(number !== 0 && number!==Math.ceil(totalData / size)+1){
            items.push(
                <Pagination.Item key={number} onClick={()=>paginate(number)} active={currentPage===number}>
                    {number}
                </Pagination.Item>,
            );
        }    
   
    }

    return (
            <Pagination size="sm"> {items} </Pagination>
    )
}