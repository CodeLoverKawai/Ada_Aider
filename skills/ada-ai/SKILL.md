---
name: ada-ai
description: Use when formulating machine learning models, neural network architectures (MLP, CNN, Transformers/Attention), loss functions, backpropagation derivations, or deploying optimized inference (ONNX).
---
# ada-ai (Machine Learning, Neural Networks & Efficient Inference)

## 1. Mathematical Foundations & Backpropagation
1. **Gradient Flow & Computational Graphs**:
   - Forward pass: $z = W x + b$, $a = \sigma(z)$, Loss $\mathcal{L}(a, y)$.
   - Backward pass (Chain Rule):
     \[
     \frac{\partial \mathcal{L}}{\partial W} = \frac{\partial \mathcal{L}}{\partial a} \odot \sigma'(z) \cdot x^T
     \]
2. **Loss Functions & Activations**:
   - **Binary Cross-Entropy**: $\mathcal{L}_{BCE} = -[y \log \hat{y} + (1-y)\log(1-\hat{y})]$ paired with Sigmoid.
   - **Categorical Cross-Entropy**: $\mathcal{L}_{CE} = -\sum y_i \log \hat{y}_i$ paired with Softmax.
   - **Modern Activations**: GELU / SwiGLU for Transformers; LeakyReLU / ELU for Deep Networks.

## 2. Transformer Architecture & Scaled Dot-Product Attention
1. **Self-Attention Mechanism**:
   \[
   \text{Attention}(Q, K, V) = \text{softmax}\left( \frac{Q K^T}{\sqrt{d_k}} \right) V
   \]
   - $Q = X W_Q$, $K = X W_K$, $V = X W_V$.
   - Scale factor $\frac{1}{\sqrt{d_k}}$ prevents vanishing gradients in softmax for large vector dimensions.
2. **Multi-Head Attention (MHA)**:
   - Projects queries, keys, and values into $h$ subspaces to capture multiple semantic relationships in parallel.

```python
import numpy as np

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.shape[-1]
    scores = np.matmul(Q, K.swapaxes(-2, -1)) / np.sqrt(d_k)
    if mask is not None:
        scores = np.where(mask == 0, -1e9, scores)
    attention_weights = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    attention_weights /= np.sum(attention_weights, axis=-1, keepdims=True)
    return np.matmul(attention_weights, V), attention_weights
```

## 3. Training Stability & Optimization
- **Optimizers**: AdamW (decoupled weight decay $\implies$ prevents gradient scaling distortion).
- **Learning Rate Schedules**: Cosine annealing with linear warm-up.
- **Normalization**: LayerNorm / RMSNorm (pre-norm architecture is preferred for deep Transformers over post-norm).

## 4. Production Model Optimization & Inference
1. **Format Export**: Export PyTorch/TensorFlow models to ONNX runtime format.
2. **Quantization**: INT8 post-training quantization (PTQ) or Quantization-Aware Training (QAT) to reduce memory bandwidth by $4\times$ with $<1\%$ accuracy drop.

## Checklist for AI / ML Implementations

- [ ] Tensor shapes and dimension broadcasting verified at every layer.
- [ ] Attention masks and causal autoregressive masks correctly applied.
- [ ] Numerical stability protected with epsilon factors in denominators ($\epsilon = 10^{-8}$) and log-sum-exp.
- [ ] Evaluation metrics report Precision, Recall, $\text{F}_1$, and ROC-AUC (not just accuracy on imbalanced data).
