import './App.css';
import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sisaUang: 0,
      presentaseUang: 0,
      pemasukanUang: 0,
      pengluaranUang: 0,
      transaksiIn: 0,
      transaksiOut: 0,
      summary: [
        {
          deskripsi: "Menerima Gaji",
          tanggal: "1 Agustus 2023",
          nominal: 1000000,
          category: "In"
        },

        {
          deskripsi: "Makan Nasi Padang",
          tanggal: "2 Agutus 2023",
          nominal: 50000,
          category: "Out"
        }
      ]
    }
    this.tambahitem = this.tambahitem.bind(this);
    this.fnHitung = this.fnHitung.bind(this);
  }

  tambahitem(objek) {
    // let newData =[...this.state.newData, objek]
    // let dataUangIn = this.state.newData.filter((item) => item.category === 'In');
    // let nominalUang = dataUangIn.map((item)=> item.nominal);
    // let jumlahUangIn = nominalUang.reduce((total, num)=> total + num);

    // let dataUangOut = this.state.newData.filter((item) => item.category === 'Out');
    // let nominalUangOut = dataUangOut.map((item)=> item.nominal);
    // let jumlahUangOut = nominalUangOut.reduce((total, num)=> total + num);

    // this.setState({
    //   pemasukanUang : jumlahUangIn,
    //   transaksiIn:nominalUang.length,
    //   pengluaranUang : jumlahUangOut,
    //   transaksiOut: nominalUangOut.length,
    //   sisaUang: jumlahUangIn - jumlahUangOut,
    //   presentaseUang: (jumlahUangIn - jumlahUangOut)/jumlahUangIn*100, 
    //   summary: newData
    // })

    this.setState(prevState => ({
      summary: [...prevState.summary, objek]
    }), () => {
      this.fnHitung();
    });
  }

  fnHitung() {

    let dataUangIn = this.state.summary.filter((item) => item.category === 'In');
    let nominalUang = dataUangIn.map((item) => item.nominal);
    let jumlahUangIn = nominalUang.reduce((total, num) => total + num, 0);

    let dataUangOut = this.state.summary.filter((item) => item.category === 'Out');
    let nominalUangOut = dataUangOut.map((item) => item.nominal);
    let jumlahUangOut = nominalUangOut.reduce((total, num) => total + num, 0);

    this.setState({
      pemasukanUang: jumlahUangIn,
      transaksiIn: nominalUang.length,
      pengluaranUang: jumlahUangOut,
      transaksiOut: nominalUangOut.length,
      sisaUang: jumlahUangIn - jumlahUangOut,
      presentaseUang: (jumlahUangIn - jumlahUangOut) / jumlahUangIn * 100
    })
  }

  componentDidMount() {
    this.fnHitung()
  }

  resetData() {
    this.setState({
      sisaUang: 0,
      presentaseUang: 0,
      pemasukanUang: 0,
      pengluaranUang: 0,
      transaksiIn: 0,
      transaksiOut: 0,
      summary: []
    });
  }

  hapusItem(index) {
    const newSummary = [...this.state.summary];
    newSummary.splice(index, 1);
    this.setState({
      summary: newSummary
    }, () => {
      this.fnHitung();
    });
  }

  render() {
    return (
      <>
        <div className="container py-5">
          <div className='row'>
            <div className='col-12 text-center'>
              <h1 className='fw-bold'>Aplikasi Pembukuan</h1>
              <hr className='w-75 mx-auto' />
              <h2 className='fw-bold'>Rp. {this.state.sisaUang},-</h2>
              <span className='title-md'>Sisa saldo anda tersisa {this.state.presentaseUang}% lagi</span>
            </div>
          </div>

          <div className='row mt-4'>

            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-1'>
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className='title-sm'>Pemasukan</span>
                <h3 className='fw-bold'>Rp. {this.state.pemasukanUang}.-</h3>
                <div>
                  <span className='title-sm text-ungu fw-bold'>{this.state.transaksiIn}</span><span className='title-sm'> Transaksi</span>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-1'>
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className='title-sm'>Pengeluaran</span>
                <h3 className='fw-bold'>Rp. {this.state.pengluaranUang}.-</h3>
                <div>
                  <span className='title-sm text-ungu fw-bold'>{this.state.transaksiOut}</span><span className='title-sm'> Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-12 d-flex justify-content-between align-items-center'>
              <h4>Ringkasan Transaksi</h4>
              <div className='wrapper-button d-flex ms-1'>
              <button className='btn btn-dark btn-reset px-2 py-2 me-2' onClick={() => this.resetData()}>Reset <i className="bi bi-arrow-clockwise"></i></button>
              <CreateModal action={this.tambahitem} category="In" variant="button btn-ungu px-2 py-2 me-2" text="Pemasukan" icon="bi bi-plus-lg" modalHead="Tambahkan Pemasukan" />
              <CreateModal action={this.tambahitem} category="Out" variant="button btn-pink px-2 py-2" text="Pengeluaran" icon="bi bi-dash-lg" modalHead="Tambahkan Pengeluaran" />
              </div>
            </div>
          </div>

          <div className='row mt-4'> 
            {this.state.summary.map((sum, index) => {
              return (
                <div key={index} className='mb-3 col-12 d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center'>

                    <div className={sum.category === "In" ? 'icon-wrapper-in' : 'icon-wrapper-out'}>
                      <i className={sum.category === "In" ? 'bi bi-wallet2' : 'bi bi-bag-dash'}></i>
                    </div>
                    <div className='transaction ms-3 d-flex flex-column'>
                      <h6>{sum.deskripsi}</h6>
                      <span className='title-sm'>{sum.tanggal}</span>
                    </div>
                  </div>
                  <h5 className={sum.category === "In" ? 'text-money-in' : 'text-money-out'}>Rp. {sum.nominal},-<button className='btn btn-warning btn-hapus' onClick={() => this.hapusItem(index)}>Hapus</button></h5>
                </div>
              )
            })}
          </div>
        </div>
      </>
    );
  }
}

class CreateModal extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      deskripsi: '',
      nominal: 0,
      tanggal: '',
      category: ''
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tambahitem = this.tambahitem.bind(this);
  }

  handleClose() {
    this.setState({
      show: false
    })

  }
  handleShow() {
    this.setState({
      show: true,
      category: this.props.category
    })
  }
  handleChange(val) {
    this.setState({
      [val.target.name]: val.target.value
    })
  }

  tambahitem() {
    const data = {
      deskripsi: this.state.deskripsi,
      nominal: parseInt(this.state.nominal),
      tanggal: this.state.tanggal,
      category: this.state.category
    }
    const fnTambahitem = this.props.action;
    fnTambahitem(data);
    this.setState({
      show: false
    })
  }

  render() {
    return (
      <>
        <button onClick={this.handleShow} className={this.props.variant}>{this.props.text} <i className={this.props.icon}></i> </button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalHead}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukan Deskripsi"
                name="deskripsi"
                value={this.state.deskripsi}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nominal</label>
              <input
                type="number"
                className="form-control"
                placeholder="Masukan Nominal"
                name="nominal"
                value={this.state.nominal}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tanggal</label>
              <input
                type="date"
                className="form-control"
                name="tanggal"
                value={this.state.tanggal}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <input
                type="hidden"
                className="form-control"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.tambahitem}>Simpan</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default App;