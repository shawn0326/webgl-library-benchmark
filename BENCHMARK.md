# Benchmark Result

CPU Intel(R) Core(TM) i9-10940X CPU @ 3.30GHz 3.31 GHz
RAM 64.0 GB (63.7 GB)
Memory 1.82 TB HDD WDC WD20EZAZ-00GGJB0, 932 GB SSD WDC WDS100T2B0C-00PXH0
GPU NVIDIA GeForce RTX 2080 Ti (11 GB)

t3d@

| FPS TEST                          | t3d | three | three(webgpu) | babylon | babylon(webgpu) |
| --------------------------------- | --- | ----- | ------------- | ------- | --------------- |
| boxes(10000)                      | 50  | 58    | 22            | 22      | 16              |
| boxes(8000 & different materials) | 49  | 33    | 26            | 18      | 13(x)           |
