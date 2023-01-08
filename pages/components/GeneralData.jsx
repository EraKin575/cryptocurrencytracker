
function DataSection({heading,value}) {
    return (
      <div className="">
        <p>{heading}</p>
        <p>{value}</p>
      </div>
    );
  }
  export default function generalData({marketCap, tradingVolume, allCoins}){
      return (
          <div className="flex">
              <DataSection heading='Market Cap' value={marketCap}/>
              <DataSection heading='Trading Volume' value={tradingVolume}/>
              <DataSection heading='All Coins' value={allCoins}/>
  
  
  
          </div>
      )
  }
  