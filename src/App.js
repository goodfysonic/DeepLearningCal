import React, { useState } from 'react';

const CNNCalculator = () => {
  const [inputSize, setInputSize] = useState('');
  const [outputSize, setOutputSize] = useState('');
  const [kernelSize, setKernelSize] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const W = parseInt(inputSize);
    const O = parseInt(outputSize); 
    const K = parseInt(kernelSize);

    if (isNaN(W) || isNaN(O) || isNaN(K)) {
      alert('Vui lòng nhập đúng các giá trị');
      return;
    }

    // O = (W - K + 2P)/S + 1
    // O - 1 = (W - K + 2P)/S
    // S(O - 1) = W - K + 2P
    // 2P = S(O - 1) - W + K
    // P = (S(O - 1) - W + K)/2

    if (W < K) {
      alert('Input size phải lớn hơn hoặc bằng kernel size');
      return;
    }

    const validPairs = [];
    const maxStride = Math.ceil((W + K) / (O - 1));

    for (let s = 1; s <= maxStride; s++) {
      const p = (s * (O - 1) - W + K) / 2;
      if (p >= 0 && Number.isInteger(p)) {
        // Verify the solution
        const calculatedO = Math.floor((W - K + 2 * p) / s) + 1;
        if (calculatedO === O) {
          validPairs.push({ stride: s, padding: p });
        }
      }
    }

    setResult(validPairs);
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '20px auto',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      backgroundColor: 'white'
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    inputGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4169E1',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    results: {
      marginTop: '20px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px'
    },
    resultItem: {
      margin: '5px 0'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tính Stride và Padding</h2>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>Input Size (W)</label>
        <input
          type="number"
          value={inputSize}
          onChange={(e) => setInputSize(e.target.value)}
          style={styles.input}
          placeholder="Nhập input size"
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Output Size (O)</label>
        <input
          type="number"
          value={outputSize}
          onChange={(e) => setOutputSize(e.target.value)}
          style={styles.input}
          placeholder="Nhập output size"
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Kernel Size (K)</label>
        <input
          type="number"
          value={kernelSize}
          onChange={(e) => setKernelSize(e.target.value)}
          style={styles.input}
          placeholder="Nhập kernel size"
        />
      </div>

      <button onClick={calculate} style={styles.button}>
        Tính toán
      </button>

      {result && (
        <div style={styles.results}>
          <h3>Các cặp giá trị có thể:</h3>
          {result.length > 0 ? (
            result.map((pair, index) => (
              <p key={index} style={styles.resultItem}>
                Stride: {pair.stride}, Padding: {pair.padding}
              </p>
            ))
          ) : (
            <p>Không tìm thấy cặp stride và padding phù hợp</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CNNCalculator;
