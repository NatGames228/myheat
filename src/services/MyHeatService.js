
class MyHeatService {
  _apiBase = 'https://t3.myheat.net/api/objects/';
  _apiKey = '';

  data = [];
  isNew = false;
  
  getResource = async (url) => {
    let res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
  }
  
  updateData = async () => {
    const res = await this.getResource(`${this._apiBase}${this._apiKey}`);
    if (res.new) {
      this.data = res.data.map(this._transformData);
    } else {
      this.data.forEach(item => {
        let buf = res.data.find((el) => el.id === item.id);
        item.temperature = this._transformData(buf).temperature;
      })
    }
    this.isNew = res.new;
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
      temperature: result.temperature,
    }
  }
}

export default MyHeatService;
