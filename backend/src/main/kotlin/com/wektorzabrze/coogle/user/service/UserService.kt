package com.wektorzabrze.coogle.user.service


import com.wektorzabrze.coogle.user.entity.FinalsScore
import org.springframework.stereotype.Service

@Service
class UserService {

    private var finalsScores: Collection<FinalsScore> = emptyList()

    fun updateFinals(finalsScores: List<FinalsScore>): List<FinalsScore> {
        this.finalsScores = finalsScores

        return finalsScores
    }

    fun getUserFinals(): Collection<FinalsScore> = this.finalsScores
    fun getUserFinalsBySubject(): Map<String, FinalsScore> = getUserFinals().associateBy { it.subject }
}