package com.wektorzabrze.coogle.university

import java.math.BigDecimal

data class ExamThreshold(val subjectToWeightMap: Map<String, BigDecimal> = emptyMap(), val minThreshold: BigDecimal = BigDecimal.ZERO)