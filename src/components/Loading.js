export default function Loading () 
{
    return  <div className="w-100 h-100 position-fixed fixed-top text-center" style={{ paddingTop: '20%', backgroundColor: '#00000070' }}>
        <div className="spinner-border"  role="status">
        <span className="sr-only align-middle"></span>
        </div>      
    </div>;
}