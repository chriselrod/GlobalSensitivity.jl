var documenterSearchIndex = {"docs":
[{"location":"methods/regression/#Regression-Method","page":"Regression Method","title":"Regression Method","text":"","category":"section"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"struct RegressionGSA <: GSAMethod\n    rank::Bool = false\nend","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"RegressionGSA has the following keyword arguments:","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"rank: flag which determines whether to calculate the rank coefficients. Defaults to false.","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"It returns a RegressionGSAResult, which contains the pearson, standard_regression, and partial_correlation coefficients, described below. If rank is true, then it also contains the ranked versions of these coefficients. Note that the ranked version of the pearson coefficient is also known as the Spearman coefficient, which is returned here as the pearson_rank coefficient.","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"For multi-variable models, the coefficient for the X_i input variable relating to the Y_j output variable is given as the [i, j] entry in the corresponding returned matrix.","category":"page"},{"location":"methods/regression/#Regression-Details","page":"Regression Method","title":"Regression Details","text":"","category":"section"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"It is possible to fit a linear model explaining the behavior of Y given the values of X, provided that the sample size n is sufficiently large (at least n > d).","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"The measures provided for this analysis by us in GlobalSensitivity.jl are","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"a) Pearson Correlation Coefficient:","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"r = fracsum_i=1^n (x_i - overlinex)(y_i - overliney)sqrtsum_i=1^n (x_i - overlinex)^2(y_i - overliney)^2","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"b) Standard Regression Coefficient (SRC):","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"SRC_j = beta_j sqrtfracVar(X_j)Var(Y)","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"where beta_j is the linear regression coefficient associated to X_j. This is also known as a sigma-normalized derivative.","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"c) Partial Correlation Coefficient (PCC):","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"PCC_j = rho(X_j - hatX_-jY_j - hatY_-j)","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"where hatX_-j is the prediction of the linear model, expressing X_j with respect to the other inputs and hatY_-j is the prediction of the linear model where X_j is absent. PCC measures the sensitivity of Y to X_j when the effects of the other inputs have been canceled.","category":"page"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"If rank is set to true, then the rank coefficients are also calculated.","category":"page"},{"location":"methods/regression/#API","page":"Regression Method","title":"API","text":"","category":"section"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"function gsa(f, method::RegressionGSA, p_range::AbstractVector; samples::Int = 1000, batch::Bool = false, kwargs...)","category":"page"},{"location":"methods/regression/#Example","page":"Regression Method","title":"Example","text":"","category":"section"},{"location":"methods/regression/","page":"Regression Method","title":"Regression Method","text":"using GlobalSensitivity\n\nfunction linear_batch(X)\n    A= 7\n    B= 0.1\n    @. A*X[1,:]+B*X[2,:]\nend\nfunction linear(X)\n    A= 7\n    B= 0.1\n    A*X[1]+B*X[2]\nend\n\np_range = [[-1, 1], [-1, 1]]\nreg = gsa(linear_batch, RegressionGSA(), p_range; batch = true)\n\nreg = gsa(linear, RegressionGSA(), p_range; batch = false)\nreg = gsa(linear, RegressionGSA(true), p_range; batch = false) #with rank coefficients","category":"page"},{"location":"examples/l_k_global/#Lotka-Volterra-Global-Sensitivities","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"","category":"section"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"Let's run GSA on the Lotka-Volterra model to and study the sensitivity of the maximum of predator population and the average prey population.","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"using GlobalSensitivity, Statistics, OrdinaryDiffEq #load packages","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"First, let's define our model:","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"function f(du,u,p,t)\n  du[1] = p[1]*u[1] - p[2]*u[1]*u[2] #prey\n  du[2] = -p[3]*u[2] + p[4]*u[1]*u[2] #predator\nend\nu0 = [1.0;1.0]\ntspan = (0.0,10.0)\np = [1.5,1.0,3.0,1.0]\nprob = ODEProblem(f,u0,tspan,p)\nt = collect(range(0, stop=10, length=200))","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"Now, let's create a function that takes in a parameter set and calculates the maximum of the predator population and the average of the prey population for those parameter values. To do this, we will make use of the remake function, which creates a new ODEProblem, and use the p keyword argument to set the new parameters:","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"f1 = function (p)\n  prob1 = remake(prob;p=p)\n  sol = solve(prob1,Tsit5();saveat=t)\n  [mean(sol[1,:]), maximum(sol[2,:])]\nend","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"Now, let's perform a Morris global sensitivity analysis on this model. We specify that the parameter range is [1,5] for each of the parameters, and thus call:","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"m = gsa(f1,Morris(total_num_trajectory=1000,num_trajectory=150),[[1,5],[1,5],[1,5],[1,5]])","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"Let's get the means and variances from the MorrisResult struct.","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"m.means\n2×2 Array{Float64,2}:\n 0.474053  0.114922\n 1.38542   5.26094\n\nm.variances\n2×2 Array{Float64,2}:\n 0.208271    0.0317397\n 3.07475   118.103","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"Let's plot the result","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"scatter(m.means[1,:], m.variances[1,:],series_annotations=[:a,:b,:c,:d],color=:gray)\nscatter(m.means[2,:], m.variances[2,:],series_annotations=[:a,:b,:c,:d],color=:gray)","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"For the Sobol method, we can similarly do:","category":"page"},{"location":"examples/l_k_global/","page":"Lotka-Volterra Global Sensitivities","title":"Lotka-Volterra Global Sensitivities","text":"m = gsa(f1,Sobol(),[[1,5],[1,5],[1,5],[1,5]],N=1000)","category":"page"},{"location":"methods/sobol/#Sobol-Method","page":"Sobol Method","title":"Sobol Method","text":"","category":"section"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":"struct Sobol <: GSAMethod\n    order::Vector{Int}\n    nboot::Int\n    conf_int::Float64\nend","category":"page"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":"The Sobol object has as its fields the order of the indices to be estimated. ","category":"page"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":"order - the order of the indices to calculate. Defaults to [0,1], which means the Total and First order indices. Passing 2 enables calculation of the Second order indices as well.","category":"page"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":"For confidence interval calculation nboot should be specified for the number (>0) of bootstrap runs  and conf_int for the confidence level, the default for which is 0.95.","category":"page"},{"location":"methods/sobol/#Sobol-Method-Details","page":"Sobol Method","title":"Sobol Method Details","text":"","category":"section"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":"Sobol is a variance-based method and it decomposes the variance of the output of the model or system into fractions which can be attributed to inputs or sets of inputs. This helps to get not just the individual parameter's sensitivities but also gives a way to quantify the affect and sensitivity from the interaction between the parameters.","category":"page"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":" Y = f_0+ sum_i=1^d f_i(X_i)+ sum_i  j^d f_ij(X_iX_j)  + f_12d(X_1X_2X_d)","category":"page"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":" Var(Y) = sum_i=1^d V_i + sum_i  j^d V_ij +  + V_12d","category":"page"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":"The Sobol Indices are \"order\"ed, the first order indices given by S_i = fracV_iVar(Y) the contribution to the output variance of the main effect of X_i, therefore it measures the effect of varying X_i alone, but averaged over variations in other input parameters. It is standardised by the total variance to provide a fractional contribution. Higher-order interaction indices S_ij S_ijk and so on can be formed by dividing other terms in the variance decomposition by Var(Y).","category":"page"},{"location":"methods/sobol/#API","page":"Sobol Method","title":"API","text":"","category":"section"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":"function gsa(f, method::Sobol, A::AbstractMatrix{TA}, B::AbstractMatrix;\n             batch=false, Ei_estimator = :Jansen1999, distributed::Val{SHARED_ARRAY} = Val(false), kwargs...) where {TA, SHARED_ARRAY}\n","category":"page"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":"Ei_estimator can take :Homma1996, :Sobol2007 and :Jansen1999 for which   Monte Carlo estimator is used for the Ei term. Defaults to :Jansen1999. Details for these can be found in the    corresponding papers:     - :Homma1996 - Homma, T. and Saltelli, A., 1996. Importance measures in global sensitivity analysis of nonlinear models. Reliability Engineering & System Safety, 52(1), pp.1-17.     - :Sobol2007 - I.M. Sobol, S. Tarantola, D. Gatelli, S.S. Kucherenko and W. Mauntz, 2007, Estimating the approx- imation errors when fixing unessential factors in global sensitivity analysis, Reliability Engineering and System Safety, 92, 957–960.     A. Saltelli, P. Annoni, I. Azzini, F. Campolongo, M. Ratto and S. Tarantola, 2010, Variance based sensitivity analysis of model output. Design and estimator for the total sensitivity index, Computer Physics Communications 181, 259–270.     - :Jansen1999 - M.J.W. Jansen, 1999, Analysis of variance designs for model output, Computer Physics Communi- cation, 117, 35–43.","category":"page"},{"location":"methods/sobol/#Example","page":"Sobol Method","title":"Example","text":"","category":"section"},{"location":"methods/sobol/","page":"Sobol Method","title":"Sobol Method","text":"using GlobalSensitivity, QuasiMonteCarlo\n\nfunction ishi(X)\n    A= 7\n    B= 0.1\n    sin(X[1]) + A*sin(X[2])^2+ B*X[3]^4 *sin(X[1])\nend\n\nn = 600000\nlb = -ones(4)*π\nub = ones(4)*π\nsampler = SobolSample()\nA,B = QuasiMonteCarlo.generate_design_matrices(n,lb,ub,sampler)\n\nres1 = gsa(ishi,Sobol(order=[0,1,2]),A,B)\n\nfunction ishi_batch(X)\n    A= 7\n    B= 0.1\n    @. sin(X[1,:]) + A*sin(X[2,:])^2+ B*X[3,:]^4 *sin(X[1,:])\nend\n\nres2 = gsa(ishi_batch,Sobol(),A,B,batch=true)","category":"page"},{"location":"examples/design_matrices/#Design-Matrices","page":"Design Matrices","title":"Design Matrices","text":"","category":"section"},{"location":"examples/design_matrices/","page":"Design Matrices","title":"Design Matrices","text":"For the Sobol Method, we can have more control over the sampled points by generating design matrices. Doing it in this manner lets us directly specify a quasi-Monte Carlo sampling method for the parameter space. Here we use QuasiMonteCarlo.jl to generate the design matrices as follows:","category":"page"},{"location":"examples/design_matrices/","page":"Design Matrices","title":"Design Matrices","text":"N = 10000\nlb = [1.0, 1.0, 1.0, 1.0]\nub = [5.0, 5.0, 5.0, 5.0]\nsampler = SobolSample()\nA,B = QuasiMonteCarlo.generate_design_matrices(N,lb,ub,sampler)","category":"page"},{"location":"examples/design_matrices/","page":"Design Matrices","title":"Design Matrices","text":"and now we tell it to calculate the Sobol indices on these designs:","category":"page"},{"location":"examples/design_matrices/","page":"Design Matrices","title":"Design Matrices","text":"sobol_result = gsa(f1,Sobol(),A,B)","category":"page"},{"location":"examples/design_matrices/","page":"Design Matrices","title":"Design Matrices","text":"We plot the first order and total order Sobol Indices for the parameters (a and b).","category":"page"},{"location":"examples/design_matrices/","page":"Design Matrices","title":"Design Matrices","text":"\np1 = bar([\"a\",\"b\",\"c\",\"d\"],sobol_result.ST[1,:],title=\"Total Order Indices prey\",legend=false)\np2 = bar([\"a\",\"b\",\"c\",\"d\"],sobol_result.S1[1,:],title=\"First Order Indices prey\",legend=false)\np1_ = bar([\"a\",\"b\",\"c\",\"d\"],sobol_result.ST[2,:],title=\"Total Order Indices predator\",legend=false)\np2_ = bar([\"a\",\"b\",\"c\",\"d\"],sobol_result.S1[2,:],title=\"First Order Indices predator\",legend=false)\nplot(p1,p2,p1_,p2_)","category":"page"},{"location":"examples/design_matrices/","page":"Design Matrices","title":"Design Matrices","text":"(Image: sobolplot)","category":"page"},{"location":"methods/efast/#eFAST-Method","page":"eFAST Method","title":"eFAST Method","text":"","category":"section"},{"location":"methods/efast/","page":"eFAST Method","title":"eFAST Method","text":"struct eFAST <: GSAMethod\n    num_harmonics::Int\nend","category":"page"},{"location":"methods/efast/","page":"eFAST Method","title":"eFAST Method","text":"The eFAST object has num_harmonics as the only field, which is the number of harmonics to sum in the Fourier series decomposition, this defaults to 4.","category":"page"},{"location":"methods/efast/#eFAST-Method-Details","page":"eFAST Method","title":"eFAST Method Details","text":"","category":"section"},{"location":"methods/efast/","page":"eFAST Method","title":"eFAST Method","text":"eFAST offers a robust, especially at low sample size, and computationally efficient procedure to get the first and total order indices as discussed in Sobol. It utilizes monodimensional Fourier decomposition along a curve exploring the parameter space. The curve is defined by a set of parametric equations,","category":"page"},{"location":"methods/efast/","page":"eFAST Method","title":"eFAST Method","text":"x_i(s) = G_i(sin ω_is)  i=12  n","category":"page"},{"location":"methods/efast/","page":"eFAST Method","title":"eFAST Method","text":"where s is a scalar variable varying over the range -  s  +, G_i are transformation functions and ω_i  i=12n is a set of different (angular) frequencies, to be properly selected, associated with each factor. For more details on the transformation used and other implementation details you can go through  A. Saltelli et al..","category":"page"},{"location":"methods/efast/#API","page":"eFAST Method","title":"API","text":"","category":"section"},{"location":"methods/efast/","page":"eFAST Method","title":"eFAST Method","text":"function gsa(f, method::eFAST, p_range::AbstractVector; n::Int=1000, batch=false, distributed::Val{SHARED_ARRAY} = Val(false), kwargs...) where {SHARED_ARRAY}","category":"page"},{"location":"methods/efast/#Example","page":"eFAST Method","title":"Example","text":"","category":"section"},{"location":"methods/efast/","page":"eFAST Method","title":"eFAST Method","text":"Below we show use of eFAST on the Ishigami function.","category":"page"},{"location":"methods/efast/","page":"eFAST Method","title":"eFAST Method","text":"using GlobalSensitivity, QuasiMonteCarlo\n\nfunction ishi(X)\n    A= 7\n    B= 0.1\n    sin(X[1]) + A*sin(X[2])^2+ B*X[3]^4 *sin(X[1])\nend\n\nlb = -ones(4)*π\nub = ones(4)*π\n\nres1 = gsa(ishi,eFAST(),[[lb[i],ub[i]] for i in 1:4],n=15000)\n\n##with batching\nfunction ishi_batch(X)\n    A= 7\n    B= 0.1\n    @. sin(X[1,:]) + A*sin(X[2,:])^2+ B*X[3,:]^4 *sin(X[1,:])\nend\n\nres2 = gsa(ishi_batch,eFAST(),[[lb[i],ub[i]] for i in 1:4],n=15000,batch=true)\n","category":"page"},{"location":"methods/morris/#Morris-Method","page":"Morris Method","title":"Morris Method","text":"","category":"section"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"struct Morris <: GSAMethod\n    p_steps::Array{Int,1}\n    relative_scale::Bool\n    num_trajectory::Int\n    total_num_trajectory::Int\n    len_design_mat::Int\nend","category":"page"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"Morris has the following keyword arguments:","category":"page"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"p_steps - Vector of Delta for the step sizes in each direction. Required.\nrelative_scale - The elementary effects are calculated with the assumption that the parameters lie in the range [0,1] but as this is not always the case scaling is used to get more informative, scaled effects. Defaults to false.\ntotal_num_trajectory, num_trajectory - The total number of design matrices that are generated out of which num_trajectory matrices with the highest spread are used in calculation.\nlen_design_mat - The size of a design matrix.","category":"page"},{"location":"methods/morris/#Morris-Method-Details","page":"Morris Method","title":"Morris Method Details","text":"","category":"section"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"The Morris method also known as Morris’s OAT method where OAT stands for One At a Time can be described in the following steps:","category":"page"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"We calculate local sensitivity measures known as “elementary effects”, which are calculated by measuring the perturbation in the output of the model on changing one parameter.","category":"page"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"EE_i = fracf(x_1x_2x_i+ Deltax_k) - yDelta","category":"page"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"These are evaluated at various points in the input chosen such that a wide “spread” of the parameter space is explored and considered in the analysis, to provide an approximate global importance measure. The mean and variance of these elementary effects is computed. A high value of the mean implies that a parameter is important, a high variance implies that its effects are non-linear or the result of interactions with other inputs. This method does not evaluate separately the contribution from the interaction and the contribution of the parameters individually and gives the effects for each parameter which takes into consideration all the interactions and its individual contribution.","category":"page"},{"location":"methods/morris/#API","page":"Morris Method","title":"API","text":"","category":"section"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"function gsa(f, method::Morris, p_range::AbstractVector; batch=false, kwargs...)","category":"page"},{"location":"methods/morris/#Example","page":"Morris Method","title":"Example","text":"","category":"section"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"Morris method on Ishigami function ","category":"page"},{"location":"methods/morris/","page":"Morris Method","title":"Morris Method","text":"using GlobalSensitivity\n\nfunction ishi(X)\n    A= 7\n    B= 0.1\n    sin(X[1]) + A*sin(X[2])^2+ B*X[3]^4 *sin(X[1])\nend\n\nlb = -ones(4)*π\nub = ones(4)*π\n\nm = gsa(ishi, Morris(num_trajectory=500000), [[lb[i],ub[i]] for i in 1:4])","category":"page"},{"location":"#Global-Sensitivity-Analysis","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"Global Sensitivity Analysis","text":"","category":"section"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"Global Sensitivity Analysis (GSA) methods are used to quantify the uncertainty in output of a model w.r.t. the parameters. These methods allow practitioners to  measure both parameter's individual contributions and the contribution of their interactions to the output uncertainity. ","category":"page"},{"location":"#Installation","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"Installation","text":"","category":"section"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"To use this functionality, you must install GlobalSensitivity.jl:","category":"page"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"]add GlobalSensitivity\nusing GlobalSensitivity","category":"page"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"Note: GlobalSensitivity.jl is unrelated to the GlobalSensitivityAnalysis.jl package.","category":"page"},{"location":"#General-Interface","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"General Interface","text":"","category":"section"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"The general interface for calling a global sensitivity analysis is either:","category":"page"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"effects = gsa(f, method, param_range; N, batch=false)","category":"page"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"where:","category":"page"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"y=f(x) is a function that takes in a single vector and spits out a single vector or scalar. If batch=true, then f takes in a matrix where each row is a set of parameters, and returns a matrix where each row is a the output for the corresponding row of parameters.\nmethod is one of the GSA methods below.\nparam_range is a vector of tuples for the upper and lower bound for the given parameter i.\nN is a required keyword argument for the number of samples to take in the trajectories/design.","category":"page"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"Note that for some methods there is a second interface where one can directly pass the design matrices:","category":"page"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"effects = gsa(f, method, A, B; batch=false)","category":"page"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"where A and B are design matrices with each row being a set of parameters. Note that generate_design_matrices from QuasiMonteCarlo.jl can be used to generate the design matrices.","category":"page"},{"location":"","page":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","title":"GlobalSensitivity.jl: Global Sensitivity Analysis (GSA)","text":"The descriptions of the available methods can be found in the Methods section. The GSA interface allows for utilizing batched functions with the batch kwarg discussed above for parallel  computation of GSA results.","category":"page"},{"location":"examples/parallelized_gsa/#Parallelized-GSA-Example","page":"Parallelized GSA Example","title":"Parallelized GSA Example","text":"","category":"section"},{"location":"examples/parallelized_gsa/","page":"Parallelized GSA Example","title":"Parallelized GSA Example","text":"In all of the previous examples, f(p) was calculated serially. However, we can parallelize our computations by using the batch interface. In the batch interface, each column p[:,i] is a set of parameters, and we output a column for each set of parameters. Here we showcase using the Ensemble Interface to use EnsembleGPUArray to perform automatic multithreaded-parallelization of the ODE solves.","category":"page"},{"location":"examples/parallelized_gsa/","page":"Parallelized GSA Example","title":"Parallelized GSA Example","text":"using GlobalSensitivity, QuasiMonteCarlo, OrdinaryDiffEq\n\nfunction f(du,u,p,t)\n  du[1] = p[1]*u[1] - p[2]*u[1]*u[2] #prey\n  du[2] = -p[3]*u[2] + p[4]*u[1]*u[2] #predator\nend\n\nu0 = [1.0;1.0]\ntspan = (0.0,10.0)\np = [1.5,1.0,3.0,1.0]\nprob = ODEProblem(f,u0,tspan,p)\nt = collect(range(0, stop=10, length=200))\n\nf1 = function (p)\n  prob_func(prob,i,repeat) = remake(prob;p=p[:,i])\n  ensemble_prob = EnsembleProblem(prob,prob_func=prob_func)\n  sol = solve(ensemble_prob,Tsit5(),EnsembleThreads();saveat=t,trajectories=size(p,2))\n  # Now sol[i] is the solution for the ith set of parameters\n  out = zeros(2,size(p,2))\n  for i in 1:size(p,2)\n    out[1,i] = mean(sol[i][1,:])\n    out[2,i] = maximum(sol[i][2,:])\n  end\n  out\nend","category":"page"},{"location":"examples/parallelized_gsa/","page":"Parallelized GSA Example","title":"Parallelized GSA Example","text":"And now to do the parallelized calls we simply add the batch=true keyword argument:","category":"page"},{"location":"examples/parallelized_gsa/","page":"Parallelized GSA Example","title":"Parallelized GSA Example","text":"sobol_result = gsa(f1,Sobol(),A,B,batch=true)","category":"page"},{"location":"examples/parallelized_gsa/","page":"Parallelized GSA Example","title":"Parallelized GSA Example","text":"This user-side parallelism thus allows you to take control, and thus for example you can use DiffEqGPU.jl for automated GPU-parallelism of the ODE-based global sensitivity analysis!","category":"page"}]
}
