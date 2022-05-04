
class MyHeatService {
  _apiBase = 'https://t3.myheat.net/api/objects/';
  _apiKey = '';

  data = [];
  isNew = true;
  
  getResource = async (url) => {
    let res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
  }
  
  updateData = async () => {
    const res = await this.getResource(`${this._apiBase}${this._apiKey}`);
    if (res.new || !this.data.length) {
      this.data = res.data.map(this._transformData);
    } else {
      this.data.forEach(item => {
        let buf = res.data.find((el) => el.id === item.id);
        if (buf) {
          item.temperature = this._transformData(buf).temperature;
        }
      })
    }
    this.isNew = res.new;
    console.log(new Date());
    console.log(this.data, this.isNew);
    console.log(res.data.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id === b.id) return 0;
      if (a.id < b.id) return -1;
    }), res.new);
  }

  getAllData = async () => {  
    await this.updateData();
    return { data: this.data, isNew: this.isNew };
  }

  getData = () => {
    return this.data;
  }

  isNew = () =>  {
    return this.isNew;
  }

  _transformData = (result) => {
    return {
      id: result.id,
      name: result.name,
      temperature: result.temperature.toFixed(1),
    }
  }
}

export default MyHeatService;
